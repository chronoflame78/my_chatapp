import React from "react";
import { signInWithGoogle } from "../../firebase/firebase.utils";

const SignIn = () => {

    return (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
}

export default SignIn;