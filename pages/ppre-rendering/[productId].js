import fs from "fs/promises";
import path from "path";
import { Fragment } from "react";

const ProductDetailsPage = ({ product }) => {
    //this condition check for reson of  fallback: true
    if (!product) {
        return <p>Loading...</p>;
    }
    return (
        <Fragment>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
        </Fragment>
    );
};

async function readFileFunction() {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return {
        data,
    };
}

/*
    *** getStaticProps(context) --- context param ***
        --- to use context param, to get hold of the concrete param values, so the concrete values for those dynamic segments of our path.
*/
export async function getStaticProps(context) {
    const { data } = await readFileFunction();

    const { params } = context;
    const productId = params.productId;
    const singleProduct = data.products.find(
        (product) => product.id === productId
    );
    if (!singleProduct) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            product: singleProduct,
        },
    };
}

/*
    *** Pre-Generated Paths (Routes) ***
        => Dynamic pages ([productId] do not just need data: you also need to know which [productId] values will be available
        => Multiple concrete [productId] page instances (e.g productId = 1, productId = 2 etc) are pre-generated

    * If we have dynamic page like [productId], default behaviour is not pre-generate the page beacuse NextJs does not know how many page re-rendering, concrete values of this dynamic segment we need.

    *** fallback can help you if we have a lot of pages that would need to be pre-generated.
            --- if we set fallback: true (We can pre-generated some pages what we want) or even if an productId value is not found here, we still might be able to render a page, so we should use if condition 
            --- if we set fallback: "blocking" (we do not need cheack condition), it's take longer, if we do not show uncompleted page


*/
export async function getStaticPaths() {
    const { data } = await readFileFunction();
    const dynamicParams = data.products.map((product) => ({
        params: { productId: product.id },
    }));
    return {
        // dynamic way parmas set
        paths: dynamicParams,
        /*
        paths: [
            {params: { productId: "p1" }},
            // {params: { productId: "p2" }}, // if we do not want to pre-generated higly visited page
            // {params: { productId: "p3" }}
        ],
        fallback: "blocking"
    */
        fallback: true,
    };
}

export default ProductDetailsPage;
