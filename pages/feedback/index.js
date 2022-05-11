import { Fragment, useState } from "react";
import { extractingFileData, handalingFilePath } from "../api/feedback";

function FeedbackPage({ loadingFeedBackData }) {
    const [singleFeedBack, setSingleFeedBack] = useState();

    function handleFeedBack(feedbackId) {
        //------------- We can use this way ---------------------------------------------------------------------
        // const feedback = loadingFeedBackData.find((feedback) => feedback.id === feedbackId);
        // setSingleFeedBack(feedback);
        //-------------------------------------------------------------------------------------------------------------
        fetch(`/api/${feedbackId}`)
            .then((response) => response.json())
            .then((data) => setSingleFeedBack(data.feedback));
    }
    return (
        <Fragment>
            {singleFeedBack && <p>{singleFeedBack.email}</p>}
            <ul>
                {loadingFeedBackData &&
                    loadingFeedBackData.map((feedback) => (
                        <>
                            <li key={feedback.id}>{feedback.text}</li>
                            <button
                                onClick={handleFeedBack.bind(null, feedback.id)}
                            >
                                Show Email
                            </button>
                        </>
                    ))}
            </ul>
        </Fragment>
    );
}

export async function getStaticProps() {
    // *** when we work with own api, we can not do HTTP request with fetch, we can use NodeJS system ***
    const filePath = handalingFilePath();
    const data = extractingFileData(filePath);
    return {
        props: {
            loadingFeedBackData: data,
        },
    };
}
export default FeedbackPage;
