import React, { useState } from "react";
import "./../screens/LoginPage/index.css"

export const LoginComponent = ({
    username, setUsername,
    password, setPassword,
    passwordConfirmed, setPasswordConfirmed,
    handleLogin, handleRegister
}) => {
    const validateInputs = () => {
        if (isLogin)
            return username.length > 4 && password.length > 4
        else
            return username.length > 4 && password.length > 4 && password === passwordConfirmed
    }

    const [isLogin, setIsLogin] = useState(true);
    const [onTouchedUsername, setOnTouchedUsername] = useState(false);
    const [onTouchedPassword, setOnTouchedPassword] = useState(false);
    const [onTouchedConfPassword, setOnTouchedConfPassword] = useState(false);

    return (
        <div className="login">

            <div className="loginContainer">

                <h1>FRIENDY</h1>

                <div className="inputs">
                    <div
                        style={{
                            marginBottom: "0.7em"
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Username"
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
                            placeholder="Password"
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
                                    placeholder="Confirm password"
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

                <button
                    className="loginButton"
                    onClick={
                        isLogin ? handleLogin : handleRegister
                    }
                    disabled={!validateInputs()}
                >
                    {
                        isLogin ? "Login" : "Register"
                    }
                </button>

                <div>
                    {
                        isLogin ? "Don't have an account? " : "Already has an account? "
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
                            isLogin ? "Register" : "Login"
                        }
                    </a>
                </div>

            </div>
        </div>
    )
}