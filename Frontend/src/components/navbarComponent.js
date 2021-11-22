import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';

import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
    const { logout, userName } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userName)
            navigate("/")
    }, [userName, navigate])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between px-3">
            <div className="d-flex">
                <a className="navbar-brand" href="#">FRIENDY</a>
            </div>

            <div className="d-flex">
                <h3 className="mx-3">{userName}</h3>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={ logout }>Sair</button>
            </div>
        </nav>
    );
}

export default NavbarComponent;