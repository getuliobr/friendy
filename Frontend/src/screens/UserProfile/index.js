import React, { useContext, useEffect, useState } from "react"
import NavbarComponent from "../../components/navbarComponent"
import { useParams } from "react-router-dom"
import { UserContext } from "../../contexts/userContext"
import { Spinner } from "react-bootstrap"

const UserProfile = () => {
    const { userid } = useParams()
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});
    const [wasSubmited, setWasSubmited] = useState(false);
    const { fetchProfile } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        setWasSubmited(true)
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            setProfile(await fetchProfile())
            setLoading(false)
        })()
    }, [])

    return (
        <div style={{
            minHeight: "100vh"
        }}>
            <NavbarComponent />
            <div className="d-flex flex-column h-100">
                {
                    loading ? 
                    <div className="d-flex m-auto">
                        Carregando..
                        <Spinner animation="border" role="status" />
                    </div>
                    : 
                    <div className="w-50 m-auto">
                        <p>Membro desde 2021</p>
                        <form onSubmit={handleSubmit} noValidate className={`d-flex flex-column ${ wasSubmited ? "was-validated" : "" }`}>
                            <div>
                                <label className="form-label">
                                    Sobre mim
                                </label>
                                <textarea required className="form-control" minLength={1} maxLength={100} style={{ maxHeight:"100px"}}/>
                                <div className="invalid-feedback">Descrição deve ter até 100 caracteres</div>
                            </div>
                            <div className="my-2">
                                <label className="form-label">
                                    Facebook
                                </label>
                                <input className="form-control"/>
                            </div>
                            <div className="my-2">
                                <label className="form-label">
                                    Instagram
                                </label>
                                <input className="form-control"/>
                            </div>
                            <button className="btn btn-success mx-auto w-25 mt-2" type="submit">Salvar</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserProfile