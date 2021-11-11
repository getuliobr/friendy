import React from 'react';

import "./Message.css";

const Message = ({ message, own, ref }) => (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop" ref={ref}>
            <div className="messageText">
                <span className="messageOwnName">
                    {message.remetenteNome}
                </span>
                <span>
                    {message.texto}
                </span>
            </div>
        </div>
    </div>
);

export default Message;