import React from 'react';
import Message from './Message';

import "./Messenger.css";

const Messenger = () => {

    return (
        <div className="messenger">
            <div className="chat">
                <div className="chatWrapper">
                    <div className="chatTop">
                        <Message own/>
                        <Message />
                        <Message own/>
                        <Message own/>
                        <Message />
                        <Message own/>
                        <Message own/>
                        <Message />
                        <Message own/>
                        <Message />
                        <Message />
                        <Message />
                        <Message own/>
                    </div>
                </div>
                <div className="chatBottom">
                    <textarea 
                        className="chatMessageInput"
                        placeholder="Messagem" 
                    />
                    <button className="chatSubmitButton">
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Messenger;