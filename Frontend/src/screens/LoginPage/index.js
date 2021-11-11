import axios from "axios";
import React, { useState } from "react";
import { LoginComponent } from "../../components/loginComponent";
import Cookies from "universal-cookie";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");
    const [loading, setLoading] = useState(false);

    const cookie = new Cookies();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const { data: { token, usuario: { id, nome } } } = await axios.post("http://localhost:3333/usuario/login", {
                nome: username,
                senha: password
            })
            cookie.set("token", token);
            cookie.set("userId", id);
            cookie.set("userName", nome);

            navigate('/home')
        } catch (e) {
            toast.error("Erro ao logar.")
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async () => {
        try {
            setLoading(true);
            const { data: { token, usuario: { id, nome } } } = await axios.post("http://localhost:3333/usuario/cadastrar", {
                nome: username,
                senha: password
            })
            cookie.set("token", token);
            cookie.set("usuarioId", id);
            cookie.set("usuarioNome", nome);

            navigate('/home')
        } catch (e) {
            toast.error("Erro ao cadastrar.")
        } finally {
            setLoading(false);
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
            loading={loading}
        />
    )
}