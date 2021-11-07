import React from 'react';

import "./Message.css";

const Message = ({ own }) => (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <p className="messageText">
            Mussum Ipsum, cacilds vidis litro abertis. Aenean aliquam molestie leo, vitae iaculis nisl. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Sapien in monti palavris qui num significa nadis i pareci latim. Cevadis im ampola pa arma uma pindureta. 
            </p>
        </div>
    </div>
);

export default Message;