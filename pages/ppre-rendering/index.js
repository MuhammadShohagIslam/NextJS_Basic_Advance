import { Fragment } from "react";

const PagePreRendering = () => {
    return (
        <Fragment>
            <div>
                <h2>What is Page Pre-Rendering</h2>
                <p>Standard React: we get back an empty HTML file and all the Javascript code. And then Javascript code runs and brings something onto the screen, that happens super fast, user will not really see a problem there but if we need data from server, it take a loading for geting data and take a long.</p>
                <p>Next JS: if the page is pre-rendering, instead of loading data only after the page was sent back to the client.NextJS pre-renders a page and pre-renders all the HTML content with all the data that might be needed.It is loads that in advance and pre-generates the finished HTML page. Fully populated HTML page which can be sent back to the client to see the visitor. It is great for SEO</p>
            </div>
            <div>
                <h2>Two Forms of Pre-Rendering</h2>
                <p>Static Generation --- all the pages are pre-generared in advance during build time</p>
                <p>Server-Side Rendering --- page are created just in time after deployment when a request reaches the server.</p>
            </div>
            <div>
                <h2>What is Static Generation</h2>
                <p>Pre-generate a page (with data prepared on the server-side) during build time. So data and pages are prepared during build time when we build our application before we deploy it.</p>
                <p>Pages are preared ahead to time and can be cached by the server / CDN serving the app</p>
            </div>
            <div>
                <h2>What is getStaticProps(context) {}</h2>
                <p>We can run any code that we would normally run on the server side only. It will not be included in the code bundle that is sent back to our clients, client is never seen into this code.</p>
            </div>
        </Fragment>
    );
}

export default PagePreRendering;