import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import classes from "./auth-form.module.css";

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const route = useRouter();
    
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const inputEmailValue = inputEmailRef.current.value;
        const inputPasswordValue = inputPasswordRef.current.value;
        const newUser = {
            email: inputEmailValue,
            password: inputPasswordValue,
        };

        if (isLogin) {
            // login logic
            const data = await signIn("credentials", {
                redirect: false,
                email: inputEmailValue,
                password: inputPasswordValue,
            });
            if (!data.error) {
                // if we use redux, we can set some state
                route.replace("/profile");
            }
        } else {
            try {
                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    body: JSON.stringify(newUser),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Something Went Wrong!");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        ref={inputEmailRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={inputPasswordRef}
                    />
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? "Login" : "Create Account"}</button>
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;
