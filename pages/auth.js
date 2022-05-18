import AuthForm from "./../components/auth/auth-form";
import { getSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

function AuthPage() {
    /*
     *** if we want loading user interface, we can use below code
     */
    // const [isLoading, setIsLoading] = useState(true);
    // const route = useRouter();

    // useEffect(() => {
    //     getSession().then((session) => {
    //         if (session) {
    //             route.replace("/");
    //         } else {
    //             setIsLoading(false);
    //         }
    //     });
    // }, [route]);
    // if (isLoading) {
    //     return <p>Loading ...</p>;
    // }

    return (
        <>
            <AuthForm />
        </>
    );
}

/*
 *** if we do not want loading user interface, we can use below code
 */
export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {
            session,
        },
    };
}
export default AuthPage;
