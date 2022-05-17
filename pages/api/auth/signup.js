import { hashPassword } from "../../../lib/auth";
import {
    databaseConnection,
    findDataToDatabase,
    insertDataToDatabase,
} from "../../../lib/db_util";

async function handler(req, res) {
    if (req.method !== "POST") {
        return;
    }
    const { email, password } = req.body;

    let client;
    try {
        client = await databaseConnection();
    } catch (error) {
        res.status(500).json({ message: "database connection is failed!" });
    }

    if (!email || !email.includes("@") || !password || password.length < 7) {
        res.status(422).json({ message: "Invalid Input...!" });
        return;
    }

    const existingUser = await findDataToDatabase(client, "nextAuthSignUp", {
        email: email,
    });
    if (existingUser) {
        res.status(422).json({ message: "User Already exist...!" });
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
        email,
        password: hashedPassword,
    };
    try {
        await insertDataToDatabase(client, "nextAuthSignUp", newUser);
    } catch (error) {
        res.status(500).json({ message: "failed to signup!" });
    }
    res.status(201).json({ message: "User created successfully!" });
    client.close();
}

export default handler;
