import React, { useState } from "react";
import { LoginComponent } from "../../components/loginComponent";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <LoginComponent
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        />
    )
}