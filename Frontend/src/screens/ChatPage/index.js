import React from 'react';
import FriendListComponent from '../../components/friendListComponent';
import Messenger from '../../components/Messenger';
import NavbarComponent from '../../components/navbarComponent';

const ChatPage = () => {
    return (
        <>
            <NavbarComponent />
            <div className="d-flex mt-3">
                <div className="bg-light w-25 mx-2">
                    <p
                    style={{
                        fontWeight:"bold"
                    }}
                    >LISTA DE USUÁRIOS SEGUIDOS</p>
                    <FriendListComponent />
                </div>
                <div className="bg-light w-75">
                    <Messenger />
                </div>
            </div>
        </>
    );
};

export default ChatPage;