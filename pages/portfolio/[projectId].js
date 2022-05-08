import { useRouter } from "next/router";

const PortfolioProjectPage = () => {
    // Dynamic paths : [anything what you want].js

    /* 
        Extracting dynamic path segment
            --- useRouter() hook from nextJS, if you want to access to router object
            --- pathname: this is the path of the page, we can get encoded path
            --- query: this query property gives us to access concrete property data that is encoded in the URL

    */
    const route = useRouter();
    console.log(route.pathname);
    console.log(route.query);
    return (
        <>
            <h2>The Portfolio Project Page</h2>
        </>
    );
};

export default PortfolioProjectPage;
