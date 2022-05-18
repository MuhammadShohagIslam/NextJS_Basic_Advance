import ProfileForm from "./profile-form";
import { getSession } from "next-auth/react";
import classes from "./user-profile.module.css";
import { useState } from "react";

function UserProfile() {
    const [errorMessage, setErrorMessage] = useState();
    /*
     *** if we want loading user interface, we can use below code ***
     */
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     getSession().then((session) => {
    //         if (!session) {
    //              window.location.href = "/auth"
    //         } else {
    //             setIsLoading(false);
    //         }
    //     });
    // }, []);
    // if (isLoading) {
    //     return <p>Loading ...</p>;
    // }

    async function onChangePassword(enteredPasswordObject) {
        const response = await fetch("/api/user/change-password", {
            method: "PATCH",
            body: JSON.stringify(enteredPasswordObject),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok) {
            setErrorMessage(data.message);
        }
    }
    return (
        <section className={classes.profile}>
            <h1>Your User Profile</h1>
            {errorMessage && <h2>{errorMessage}</h2>}
            <ProfileForm onChangePassword={onChangePassword} />
        </section>
    );
}

/*
 *** if we do not want loading user interface, we can use below code ***
 */
export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                parmanent: false,
            },
        };
    }
    return {
        props: {
            session,
        },
    };
}
export default UserProfile;
