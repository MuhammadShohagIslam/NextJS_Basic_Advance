import { useRouter } from "next/router";

/*
    *** Adding All-catch-router ***
        --- [...slug(anyname)] with the three dots here, nextJS can catch anything after blog 
        beacuse we are defining this blog in the blog folder and is available as an array, 
        through the slug property on that qury object in the route object.
*/
const BlogPage = () => {
    const route = useRouter();
    console.log(route.query);
    return (
        <>
            <h2>Blog Page with all catch route</h2>
        </>
    );
}

export default BlogPage;