import {createContext, useState} from "react";
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify'
import axios from "axios";
export const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const cookie = new Cookies();
    const [userName, setUserName] = useState(cookie.get("userName"));
    const [userToken, setUserToken] = useState(cookie.get("token"));
    const [userId, setUserId] = useState(cookie.get("userId"));
    const [friendList, setFriendList] = useState([]);

    const api = axios.create({
        baseURL: "http://localhost:3333",
        headers: { Authorization: userToken }
    })

    const handleLogin = async (username, password) => {
        try {
            const { data: { token, usuario: { id, nome } } } = await api.post("/usuario/login", {
                nome: username,
                senha: password
            })
            cookie.set("token", token);
            cookie.set("userId", id);
            cookie.set("userName", nome);
            setUserToken(token);
            setUserName(nome);
            setUserId(id);
        } catch (e) {
            toast.error("Erro ao logar.")
        }
    }

    const handleRegister = async (username, password) => {
        try {
            const { data: { token, usuario: { id, nome } } } = await api.post("/usuario/cadastrar", {
                nome: username,
                senha: password
            })
            cookie.set("token", token);
            cookie.set("userId", id);
            cookie.set("userName", nome);
            setUserToken(token);
            setUserName(nome);
            setUserId(id);
        } catch (e) {
            toast.error("Erro ao cadastrar.")
        }
    }

    const getFollowing = async () => {
        try {
            const following = await api.get("/seguindo", {
                id: userId,
            })
            setFriendList(following.data.seguindo.map(user => user.seguindo[0]))
        } catch (e) {
            toast.error("Ocorreu um erro ao buscar quem você segue.")
        }
    }

    const logout = () => {
        cookie.remove("token");
        cookie.set("userId");
        cookie.set("userName");
        setUserToken(undefined);
        setUserName(undefined);
    }

    const fetchProfile = async (userid) => {
        try {
            const { data } = await axios.get(`http://localhost:3333/usuario/${userid}`,  { headers: { Authorization: userToken } });
            return data;
        } catch(e) {
            toast.error("Erro ao carregar perfil de usuário.")
        }
    }

    return (
        <UserContext.Provider
            value={{userName, userToken, userId, handleLogin, handleRegister, logout, getFollowing, friendList, fetchProfile}}
        >
            {children}
        </UserContext.Provider>
    )
}