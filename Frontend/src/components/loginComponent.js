import React from "react";
import "./../screens/LoginPage/index.css"

export const LoginComponent = ({ username, setUsername, password, setPassword }) => {
    const validateInputs = () => {
        return username.length > 4 && password.length > 4
    }

    const submitValue = () => {
        const userDetails = {
            "User": username,
            "Password": password
        }
        console.log(userDetails)
    }

    return (
        <div className="login">
            <div className="loginContainer">
                <h1>FRIENDY</h1>
                <div className="inputs">
                    <div className="row">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="row">
                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="loginButton"
                    onClick={submitValue}
                    disabled={!validateInputs()}
                >
                    Login
                </button>
                <div>
                    Don't have an account?
                    <a href="/"> Register</a>
                </div>
            </div>
        </div>
    )
}