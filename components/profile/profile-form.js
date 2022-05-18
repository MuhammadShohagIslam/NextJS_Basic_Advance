import classes from "./profile-form.module.css";
import { useRef } from "react";

function ProfileForm({onChangePassword}) {
    const inputNewPasswordRef = useRef();
    const inputOldPasswordRef = useRef();

    function handleChangePassword(event) {
        event.preventDefault();
        let enteredNewPassword = inputNewPasswordRef.current.value;
        let enteredOldPassword = inputOldPasswordRef.current.value;

        const enteredPasswordObject = {
            newPassword: enteredNewPassword,
            oldPassword: enteredOldPassword,
        };
        onChangePassword(enteredPasswordObject);
    }
    return (
        <form className={classes.form} onSubmit={handleChangePassword}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input
                    type="password"
                    id="new-password"
                    ref={inputNewPasswordRef}
                />
            </div>
            <div className={classes.control}>
                <label htmlFor="old-password">Old Password</label>
                <input
                    type="password"
                    id="old-password"
                    ref={inputOldPasswordRef}
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
