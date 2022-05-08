import { useRouter } from "next/router";

const SelectedClientProjectPage = () => {
    const route = useRouter();
    console.log(route.pathname);
    console.log(route.query)
    return (
        <>
            <h2>Selected Clientt Project Page</h2>
        </>
    );
}

export default SelectedClientProjectPage;