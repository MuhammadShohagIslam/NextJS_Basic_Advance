import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

/*
    *** Incremental Static Generation(ISG) ***
        *What if, if our website data is changed frequently, what the solution of NextJS*
            => (S1) --- we do pre-build our page
            =>(S2) -- ISG, we can use ISG NextJS concept, which Pre-generate page it on every request, at most every X seconds.
                --- Serve "old" page if re-generation is not needed yet.
                --- Generate store and serve "new" page otherwise.
*/

const RunningServerSideCodeWithFileSystem = ({ products }) => {
    return (
        <Fragment>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </Fragment>
    );
};

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath); // json data
    const data = JSON.parse(jsonData); // converted json data to js object data

    // if we failed to fetch data or is not able to access the database
    if(!data){
        return{
            redirect: {
                destination: "/some-route what we want"
            }
        }
    }
    // when our data is not available
    if(data.products.length === 0){
        return {
            notFound: true 
        }
    }

    return {
        props: {
            products: data.products,
        },
        revalidate: 10 // less dynamich website 1, hight dynamic 10
    };
}

export default RunningServerSideCodeWithFileSystem;
