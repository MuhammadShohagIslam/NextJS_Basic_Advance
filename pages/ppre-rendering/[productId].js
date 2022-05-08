import { Fragment } from "react";
import path from 'path';
import fs from 'fs/promises'

/*
    *** getStaticProps(context) --- context param ***
        --- to use context param, to get hold of the concrete param values, so the concrete values for those dynamic segments of our path.
*/

const ProductDetailsPage = ({product}) => {
    return (
        <Fragment>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
        </Fragment>
    );
}

export async function getStaticProps(context){
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    const { params } = context;
    const productId = params.productId;
    const singleProduct = data.products.find(product => product.id === productId);

    return{
        props:{
            product: singleProduct
        }
    }
}

/*
    *** Pre-Generated Paths (Routes) ***
        => Dynamic pages ([productId] do not just need data: you also need to know which [productId] values will be available
        => Multiple concrete [productId] page instances (e.g productId = 1, productId = 2 etc) are pre-generated

    * If we have dynamic page like [productId], default behaviour is not pre-generate the page beacuse NextJs does not know how many page re-rendering, concrete values of this dynamic segment we need.


*/
export async function getStaticPaths(){
    return{
        paths: [
            {params: { productId: "p1" }},
            {params: { productId: "p2" }},
            {params: { productId: "p3" }}
        ],
        fallback: false
    }
}

export default ProductDetailsPage;