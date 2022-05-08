/*
 *** NextJS pre-rendering page automatically dy default, but if use getStaticPros(context){} 
 which tells to NextJS will not pre rendered a page, it's kind of confirm to NextJS to JS that
  this page still should be pre-generated. It's run on the server, 
  not in the browser and during the build process, after it was deployed
 */
function HomePage(props) {
    const { products } = props;
    return (
        <>
            <h2>This is home page</h2>

            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            products: [
                {
                    id: "p1",
                    title: "Product 1",
                },
            ],
        },
    };
}

export default HomePage;
