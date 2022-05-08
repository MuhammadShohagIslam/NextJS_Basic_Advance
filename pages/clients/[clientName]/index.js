import { useRouter } from "next/router";

const ClientProjectPage = () => {
    // This is nested dynamic routes and path
    const route = useRouter();
    console.log(route.query);
    return (
        <>
            <h2>Individual Client All Project</h2>
            <button
                onClick={() =>
                    route.push({
                        pathname: `/clients/[clientName]/[clientProjectId]`,
                        query: { clientName: "A", clientProjectId: "1" },
                    })
                }
            >
                Load Project A
            </button>
        </>
    );
};

export default ClientProjectPage;
