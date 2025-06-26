import React from "react";
import { signInWithGoogle } from "../utils/auth";

const Login = () => (
  <button onClick={signInWithGoogle}>Sign In with Google</button>
);

export default Login;