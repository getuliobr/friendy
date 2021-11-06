import axios from "axios";
import React, { useState } from "react";
import { LoginComponent } from "../../components/loginComponent";
import Cookies from "universal-cookie";
import { toast } from 'react-toastify'

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");

    const cookie = new Cookies();

    const handleLogin = async () => {
        try {
            const { data: { token, usuario: { id, nome } } } = await axios.post("http://localhost:3333/usuario/login", {
                nome: username,
                senha: password
            })
            cookie.set("token", token)
        } catch (e) {
            toast.error("Erro ao logar.")
        }
    }

    const handleRegister = async () => {
        try {
            const { data: { token, usuario: { id, nome } } } = await axios.post("http://localhost:3333/usuario/cadastrar", {
                nome: username,
                senha: password
            })
            cookie.set("token", token)
        } catch (e) {
            toast.error("Erro ao cadastrar.")
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