import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
    const { logout, userName, userId } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userName)
            navigate("/")
    }, [userName, navigate])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between px-3">
            <div className="d-flex">
                <Link to="/home" className="navbar-brand">FRIENDY</Link>
            </div>

            <div className="d-flex">
                <Link to={`/profile/${userId}`} className="btn btn-outline-dark mx-3">
                    <h5 className="m-0">{userName}</h5>
                </Link>
                <button className="btn btn-outline-danger my-2 my-sm-0" onClick={ logout }><h5 className="m-0">Sair</h5></button>
            </div>
        </nav>
    );
}

export default NavbarComponent;