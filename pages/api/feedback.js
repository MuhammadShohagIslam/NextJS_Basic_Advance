import fs from "fs";
import path from "path";

export function handalingFilePath() {
    return path.join(process.cwd(), "data", "feedback.json");
}
export function extractingFileData(filePath) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);

    return data;
}
function feedBackHandler(req, res) {
    if (req.method === "POST") {
        const email = req.body.email;
        const text = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: text,
        };
        const filePath = handalingFilePath();
        const data = extractingFileData(filePath);
        data.push(newFeedback);

        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(200).json({ message: "success!", data: newFeedback });
    } else {
        const filePath = handalingFilePath();
        const data = extractingFileData(filePath);

        res.status(200).json({ feedback: data });
    }
}

export default feedBackHandler;
