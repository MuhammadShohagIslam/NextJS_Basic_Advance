import { handalingFilePath, extractingFileData } from "./feedback";
function handlerDynamicApiRoute(req, res) {
    // we can use any http method or work with dynamic route  like delete
    // if(req.method === "POST"){

    // }
    const feedbackId = req.query.feedbackId;
    const filePath = handalingFilePath();
    const feedbacks = extractingFileData(filePath);
    const feedback = feedbacks.find((feedback) => feedback.id === feedbackId);

    res.status(200).json({ feedback });
}

export default handlerDynamicApiRoute;
