import { getSession } from "next-auth/react";
import { hashPassword, varifyPassword } from "../../../lib/auth";
import { databaseConnection, findDataToDatabase, updateDataToDatabase } from "../../../lib/db_util";

async function handler(req, res) {
    if (req.method !== "PATCH") {
        return;
    }
    // checking authenticated user change password or not
    const session = await getSession({ req: req });
    if (!session) {
        res.status(401).json({ message: "Not Authenticated" });
        return;
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (!oldPassword || oldPassword < 7 || !newPassword || newPassword < 7) {
        res.status(422).json({ message: "Invalid Input...!" });
        return;
    }

    let client;
    try {
        client = await databaseConnection();
    } catch (error) {
        res.status(500).json({ message: "Database Connection is Failed!" });
    }

    const user = await findDataToDatabase(client, "nextAuthSignUp", {
        email: userEmail,
    });

    if (!user) {
        res.status(404).json({ message: "User Not Found!" });
        client.close();
        return;
    }

    const isValid = await varifyPassword(oldPassword, user.password);
    if (!isValid) {
        res.status(403).json({ message: "Invalid Password!" });
        client.close();
        return;
    }
    const currentHashedPassword = await hashPassword(newPassword);

    const updatedPassword = await updateDataToDatabase(
        client,
        "nextAuthSignUp",
        { email: userEmail },
        {
            $set: { password: currentHashedPassword },
        }
    );

    client.close();
    res.status(201).json({ message: "Password Updated Successfully!" });
}

export default handler;
