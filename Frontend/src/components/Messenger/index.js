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

    const $scrollRef = useRef();
    const $socket = useRef();

    const cookie = new Cookies();
    const userId = cookie.get("userId");
    const userName = cookie.get("userName");

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
    }, []);

    useDidMountAndUpdate(() => {
        getMessages();
    }, [currentTalk]);

    useEffect(() => {
        $socket.current.emit("addUser", userId);
        $socket.current.on("getUsers", users => {
            setUsersOnline(users);
        })
    }, [userId]);


    useEffect(() => {
        $scrollRef?.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    const handleConnectChat = useCallback(() => {
        setCurrentTalk();
    }, []);

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
                />
            </div>
        )
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
    }



    return (
        <div className="messenger">
            <div className="chat">
                <div className="chatWrapper">
                    {renderMessages()}
                </div>
            </div>
        </div>
    );
};

export default Messenger;
