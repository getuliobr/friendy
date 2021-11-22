import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { UserContext } from "../contexts/userContext";
import "./../screens/LoginPage/index.css"

import { useNavigate } from "react-router-dom";

export const LoginComponent = () => {
    const { handleLogin, handleRegister, userToken } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (userToken) 
            navigate("/home")
    }, [userToken, navigate])

    const validateInputs = () => {
        if (isLogin)
            return username.length > 4 && password.length > 4
        else
            return username.length > 4 && password.length > 4 && password === passwordConfirmed
    }
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");
    const [loading, setLoading] = useState(false);

    const [isLogin, setIsLogin] = useState(true);
    const [onTouchedUsername, setOnTouchedUsername] = useState(false);
    const [onTouchedPassword, setOnTouchedPassword] = useState(false);
    const [onTouchedConfPassword, setOnTouchedConfPassword] = useState(false);

    return (
        <div className="login">

            <div className="loginContainer">

                <h1>FRIENDY</h1>

                {loading ? (
                    <div className="spinner">
                        <Spinner animation="border" role="status" />
                    </div>
                ) : null}

                <div className="inputs">
                    <div
                        style={{
                            marginBottom: "0.7em"
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Nome de usuário"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            minLength={4}
                            maxLength={10}
                            onBlur={() => setOnTouchedUsername(true)}
                        />
                        {
                            onTouchedUsername && username.length < 5 && (
                                <p
                                    style={{
                                        margin: 0,
                                        color: "red",
                                        fontSize: "0.8em"
                                    }}
                                >Mínimo de 5 caracteres.</p>
                            )
                        }
                    </div>
                    <div
                        style={{
                            marginBottom: "0.7em"
                        }}
                    >
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            minLength={4}
                            maxLength={16}
                            onBlur={() => setOnTouchedPassword(true)}
                        />
                        {
                            onTouchedPassword && password.length < 5 && (
                                <p
                                    style={{
                                        margin: 0,
                                        color: "red",
                                        fontSize: "0.8em"
                                    }}
                                >Mínimo de 5 caracteres.</p>
                            )
                        }
                    </div>
                    {
                        !isLogin && (
                            <div
                                style={{
                                    marginBottom: "0.7em"
                                }}
                            >
                                <input
                                    type="password"
                                    placeholder="Insira a senha novamente"
                                    value={passwordConfirmed}
                                    onChange={e => setPasswordConfirmed(e.target.value)}
                                    minLength={4}
                                    maxLength={16}
                                    onBlur={() => setOnTouchedConfPassword(true)}
                                />
                                {
                                    onTouchedConfPassword && passwordConfirmed.length < 5 && (
                                        <p
                                            style={{
                                                margin: 0,
                                                color: "red",
                                                fontSize: "0.8em"
                                            }}
                                        >Mínimo de 5 caracteres.</p>
                                    )
                                }
                                {
                                    onTouchedConfPassword && password !== passwordConfirmed && (
                                        <p
                                            style={{
                                                margin: 0,
                                                color: "red",
                                                fontSize: "0.8em"
                                            }}
                                        >As senhas devem ser iguais.</p>
                                    )
                                }
                            </div>
                        )
                    }
                </div>

                <Button
                    className="loginButton"
                    onClick={async () => {
                        setLoading(true)
                        
                        if (isLogin)
                            await handleLogin(username, password)
                        else
                            await handleRegister(username, password)
                        
                        setLoading(false)
                        }
                    }
                    disabled={!validateInputs()}
                >
                    {
                        isLogin ? "Entrar" : "Cadastrar"
                    }
                </Button>

                <div>
                    {
                        isLogin ? "Não possui uma conta ? " : "Já possui uma conta ? "
                    }
                    <a
                        href="/#"
                        className="changeLogin"
                        onClick={() => {
                            setIsLogin(!isLogin)
                            setOnTouchedUsername(false)
                            setOnTouchedPassword(false)
                            setOnTouchedConfPassword(false)
                        }}>
                        {
                            isLogin ? "Cadastrar-se" : "Entrar"
                        }
                    </a>
                </div>

            </div>
        </div>
    )
}