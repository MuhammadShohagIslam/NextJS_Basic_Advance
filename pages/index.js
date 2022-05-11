import { Fragment, useRef, useState } from "react";
/*
    *** API Routes ***
        => Application Programming Interface
        => REST API = Representational State Transfer (a specific form / structure for web APIs)
        => Data is typically transferred in JSON (JavaScript Object Notation) format.
        => URLs that do not return pages (HTML), but return or provide a (REST) API or RAW Data with JSON Format.
        => Request are typically not sent by entering URL in browser but via JavaScript code (Ajax).
    
        Clinet(Browser, Mobile App, Shell...) -------Req Data -------> Server
                                                                   <----- Res Data ---------
*/


function HomePage() {
    const [loadingFeedBackData, setLoadingFeedbackData] = useState([]);
    const inputEmailRef = useRef();
    const inputTextRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        const inputEmailValue = inputEmailRef.current.value;
        const inputTextValue = inputTextRef.current.value;
        const reqBody = {
            email: inputEmailValue,
            text: inputTextValue,
        };

        fetch("/api/feedback", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }
    function handleLoading() {
        fetch("/api/feedback")
            .then((response) => response.json())
            .then((data) => setLoadingFeedbackData(data.feedback));
    }
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Title</label>
                    <input id="email" type="email" ref={inputEmailRef} />
                </div>
                <div>
                    <label htmlFor="text">Title</label>
                    <textarea id="text" rows="5" ref={inputTextRef}></textarea>
                </div>
                <button type="submit">Send</button>
            </form>
            <div>
                <button type="button" onClick={handleLoading}>
                    Loading Feedback Data
                </button>
                <ul>
                    {loadingFeedBackData && loadingFeedBackData.map(feedback => (
                        <li key={feedback.id}>{feedback.email}</li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
}

export default HomePage;

