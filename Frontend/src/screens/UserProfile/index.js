import React, { useContext, useEffect, useState } from "react"
import NavbarComponent from "../../components/navbarComponent"
import { useParams } from "react-router-dom"
import { UserContext } from "../../contexts/userContext"
import { Placeholder, Spinner } from "react-bootstrap"
import axios from "axios"
import Cookies from 'universal-cookie';
import { toast } from "react-toastify"

const UserProfile = () => {
    const { userid } = useParams()
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});
    const [wasSubmited, setWasSubmited] = useState(false);
    const { fetchProfile } = useContext(UserContext);
    const { userId } = useContext(UserContext);

    const { userToken } = useContext(UserContext)

    useEffect(async () => {
        setLoading(true)
        const profile = await fetchProfile(userid);
        const profileFields = Object.keys(profile);
        
        profileFields.map((field) =>
        setProfile((state) => ({...state, [field]: profile[field] }))
        );

        setLoading(false);
        return () => {};
    }, [])
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.patch(`http://localhost:3333/usuario/atualizar`, profile, { headers: { Authorization: userToken}});
            setWasSubmited(true);
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (e, field) => {
        setProfile({
          ...profile,
          [field]: e.target.value //edit
        });
    };

    if(userId == profile.id){
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
                            <p>Membro desde{' '}
                                {profile.createdAt.substring(8,10) + '/' + profile.createdAt.substring(5,7) + '/' + profile.createdAt.substring(0,4)}
                            </p>
                            <form onSubmit={handleSubmit} noValidate className={`d-flex flex-column ${ wasSubmited ? "was-validated" : "" }`}>
                                <div>
                                    <label className="form-label">
                                        Sobre mim
                                    </label>
                                    <textarea 
                                    required className="form-control" 
                                    minLength={0} maxLength={100} 
                                    style={{ maxHeight:"100px"} } 
                                    placeholder="Descreva você mesmo" 
                                    value={profile.descricao || ""}
                                    onChange={e => handleChange(e, 'descricao')}
                                    />
                                    <div className="invalid-feedback">Descrição deve ter até 100 caracteres</div>
                                </div>
                                <div className="my-2">
                                    <label className="form-label">
                                        Facebook
                                    </label>
                                    <input 
                                    className="form-control" 
                                    placeholder={profile.facebook != null ? profile.facebook : "facebook.com/SEU-USUARIO"}
                                    value= {profile.facebook || ""}
                                    onChange={e => handleChange(e, 'facebook')}
                                    />
                                </div>
                                <div className="my-2">
                                    <label className="form-label">
                                        Instagram
                                    </label>
                                    <input 
                                    className="form-control" 
                                    placeholder={profile.instagram != null ? '@'+profile.instagram : "@seuInsta"}
                                    value={profile.instagram || ""}
                                    onChange={e => handleChange(e, 'instagram')}
                                    />
                                </div>
                                <button className="btn btn-success mx-auto w-25 mt-2" type="submit">Salvar</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        )
    }
    else{
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
                            <p>Membro desde{' '}
                                {profile.createdAt.substring(8,10) + '/' + profile.createdAt.substring(5,7) + '/' + profile.createdAt.substring(0,4)}
                            </p>
                            <form onSubmit={handleSubmit} noValidate className={`d-flex flex-column ${ wasSubmited ? "was-validated" : "" }`}>
                                <div>
                                    <label className="form-label">
                                        Sobre mim
                                    </label>
                                    <textarea 
                                    required className="form-control" 
                                    minLength={0} maxLength={100} 
                                    style={{ maxHeight:"100px"} } 
                                    placeholder="Sem Descrição" 
                                    value={profile.descricao || ""}
                                    onChange={e => handleChange(e, 'descricao')}
                                    disabled
                                    />
                                    <div className="invalid-feedback">Descrição deve ter até 100 caracteres</div>
                                </div>
                                <div className="my-2">
                                    <label className="form-label">
                                        Facebook
                                    </label>
                                    <input 
                                    className="form-control" 
                                    placeholder={profile.facebook != null ? profile.facebook : ""}
                                    value= {profile.facebook || ""}
                                    onChange={e => handleChange(e, 'facebook')}
                                    disabled
                                    />
                                </div>
                                <div className="my-2">
                                    <label className="form-label">
                                        Instagram
                                    </label>
                                    <input 
                                    className="form-control" 
                                    placeholder={profile.instagram != null ? '@'+profile.instagram : ""}
                                    value={profile.instagram || ""}
                                    onChange={e => handleChange(e, 'instagram')}
                                    disabled
                                    />
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        )
                }
}

export default UserProfile