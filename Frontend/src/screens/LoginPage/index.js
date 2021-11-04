import axios from "axios";
import React, { useState } from "react";
import { LoginComponent } from "../../components/loginComponent";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://www.api.com", { 
                username,
                password
            })
        } catch(e) {
            console.log(e)
        }
    }

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://www.api.com", { 
                username,
                password,
                passwordConfirmed
            }) 
        } catch(e) {
            console.log(e)
        }
    }
    
    return (
        <LoginComponent
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            passwordConfirmed={passwordConfirmed}
            setPasswordConfirmed={setPasswordConfirmed}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
        />
    )
}