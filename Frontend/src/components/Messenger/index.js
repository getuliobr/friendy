import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { Button, Form } from 'react-bootstrap';
import { FaHandsHelping, FaTelegramPlane } from 'react-icons/fa';
import axios from 'axios';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

import Message from './Message';
import useDidMountAndUpdate from '../../hooks/use-did-mount-and-update';
import './Messenger.css';

const Messenger = () => {
    const [currentTalk, setCurrentTalk] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState("");
    const [currentUserReceiverId, setCurrentUserReceiverId] = useState("")
    const [currentUserReciever, setcurrentUserReciever] = useState("");

    const $scrollRef = useRef();
    const $socket = useRef();

    const cookie = new Cookies();
    const userId = cookie.get("userId");
    const userName = cookie.get("userName");
    const token = cookie.get("token");

    const getMessages = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3333/mensagens/${currentTalk?.id}`);
            setMessages(data);
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        $socket.current = io("ws://localhost:8900");
        $socket.current.on("getMessage", message => {
            setArrivalMessage({
                ...message,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentTalk?.destinatario &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentTalk]);

    useDidMountAndUpdate(() => {
        getMessages();
    }, [currentTalk]);

    useEffect(() => {
        $socket.current.emit("addUser", userId);
        $socket.current.on("getUsers", users => {
            // console.log(users);
        })
        // $socket.current.on("disconnectedChat", isDisconnectedChat => {
        //     if(isDisconnectedChat) {
        //         setCurrentTalk(null);
        //     }
        // })
    }, [userId]);


    useEffect(() => {
        $scrollRef?.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    const handleConnectChat = async () => {
        await Promise.all([
            $socket.current.emit("checkConversationAvailable", userId),
            $socket.current.on("getConversationAvailable", conversation => {
                // console.log('conversation', { conversation })
                if (conversation) {
                    setCurrentTalk({
                        id: conversation.id,
                        destinatario: conversation.remetente,
                        rementente: conversation.destinatario,
                    });
                }
            })
        ]);

        if (!currentTalk) {
            await $socket.current.emit("checkReciveAvailable", userId);
            await $socket.current.on("getReciver", async reciver => {
                // console.log({ reciver })
                if (reciver) {
                    const { data: { conversa } } = await axios.post(`http://localhost:3333/conversa/criar`, {
                        destinatarioId: reciver,
                        remetenteId: userId,
                    });

                    setCurrentTalk(conversa);
                    $socket.current.emit("createRandomConversation", conversa);
                    return;
                } 
                // else {
                //     toast.info("No momento não temos um usuário disponível, tente mais tarde");
                // }
            })
        }
    };

    const onChangeInputChat = useCallback(event => {
        setNewMessage(event.target.value)
    }, []);

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const valueSubmit = {
            conversaId: currentTalk.id,
            destinatarioId: currentTalk.destinatario,
            remetenteId: userId,
            remetenteNome: userName,
            texto: newMessage,
        };

        await $socket.current.emit("sendMessage", valueSubmit);
        getUserDest();
        followedUser();

        try {
            const { data } = await axios.post("http://localhost:3333/mensagem/enviar", valueSubmit);
            setMessages([...messages, data.mensagem]);
            setNewMessage("");
        } catch (err) {
            toast.error(err.message);
        }

    }, [currentTalk?.id, currentTalk?.destinatario, messages, newMessage, userId, userName]);

    const renderMessage = message => {
        const own = message.remetenteId === userId;

        return (
            <div
                ref={$scrollRef}
                key={message.id}
            >
                <Message
                    message={message}
                    own={own}
                    key={message.id}
                />
            </div>
        )
    };

    const getUserDest = async () => {
        
        let userDestId;
        currentTalk.rementente == userId ? userDestId = currentTalk.destinatario: userDestId = currentTalk.rementente;
        const response = await axios.get(`http://localhost:3333/usuario/${userDestId}`, { headers: { Authorization: token } });
        setCurrentUserReceiverId(userDestId);
        setcurrentUserReciever(response.data.nome);
    };

    const followedUser = async () => {
        const request = await axios.get(`http://localhost:3333/seguindo`, { headers: { Authorization: token } });
        console.log(request);
    };

    const renderFollowButton = () => {
        return(
            <>
            <Button>Seguir</Button>
            </>
        );
    }


    const renderMessages = () => {
        if (currentTalk) {
            return (
                <>
                    <div className="chatTop">
                        {messages.map(message => (
                            renderMessage(message)
                        ))}
                    </div>
                    <Form className="chatBottom">
                        <Form.Control
                            as="textarea"
                            className="chatMessageInput"
                            placeholder="Messagem"
                            onChange={onChangeInputChat}
                            value={newMessage}
                        />
                        <Button
                            className="chatSubmitButton"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            <FaTelegramPlane />
                        </Button>
                    </Form>
                </>
            );
        }

        return (
            <div>
                <Button
                    onClick={handleConnectChat}
                >
                    Conecte-se <FaHandsHelping />
                </Button>
            </div>
        )
    };


    return (
        <div className="messenger">
            <div className='navBarChat'>
                <h3>{currentUserReciever}</h3>
                {renderFollowButton()}
            </div>
            <div className="chat">
                <div className="chatWrapper">
                    {renderMessages()}
                </div>
            </div>
        </div>
    );
};

export default Messenger;
