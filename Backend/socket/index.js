const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];
let randomsConversation = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
}

const addRandomConversation = conversationValues => {
    !randomsConversation.some((conversation) => conversation.id === conversationValues.id) &&
    randomsConversation.push(conversationValues);
}

const removeUser = socketId => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

const getUserBySocket = socketId => {
    return users.find((user) => user.socketId === socketId);
}

const getRandomConversation = userId => {
    return randomsConversation.find(conversation => 
        conversation.destinatario === userId || conversation.remetente === userId
    );
};

const socketUserWaitingDisconnectedChat = socketId => {
    const userDisconnected = getUserBySocket(socketId);
    const conversationUserDisconnected = getRandomConversation(userDisconnected.userId);
    console.log(conversationUserDisconnected);
    if (conversationUserDisconnected.destinatario === userDisconnected.userId) {
        return getUser(conversationUserDisconnected.remetente).socketId;
    }

    return getUser(conversationUserDisconnected.destinatario).socketId;
}

const removeRandomConversation = socketId => {
    const userDisconnected = getUserBySocket(socketId);
    console.log(userDisconnected);
    if(userDisconnected) {
        const randomConversationUserDisconnected = getRandomConversation(userDisconnected.userId);
        if (randomConversationUserDisconnected) {
            const indexConversationRemove = randomsConversation.indexOf(randomConversationUserDisconnected);
            randomsConversation.splice(indexConversationRemove, 1);
        }
    }
}


const getUserAvailable = senderId => {
    console.log(users);
    const userAvailable = users.find(user => {
        if (user.userId !== senderId){
            const reciver = !getRandomConversation(user.userId);
            if (reciver) {
                return user;
            }
        };
    });

    return userAvailable;
}


io.on("connection", (socket) => {  
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users)
    })

    socket.on("checkConversationAvailable", senderId => {
        const random = getRandomConversation(senderId)
        const user = getUser(senderId);
        io.to(user.socketId).emit("getConversationAvailable", random);
    })

    socket.on("checkReciveAvailable", senderId => {
        const user = getUser(senderId);       
        const userAvailable = getUserAvailable(senderId);
        if (userAvailable) {
            addRandomConversation(senderId, userAvailable.userId);
            io.to(user.socketId).emit("getReciver", userAvailable.userId);
        }
        io.to(user.socketId).emit("getReciver", null);
    })

    socket.on("createRandomConversation", conversation => {    
        addRandomConversation(conversation);
    })

    socket.on("sendMessage", message => {
        const user = getUser(message.destinatarioId);
        io.to(user.socketId).emit("getMessage", message);
    });

    socket.on("disconnect", async () => {
        // await io.to(
        //     socketUserWaitingDisconnectedChat(socket.id)
        // ).emit("disconnectedChat", true);
        
        // removeRandomConversation(socket.id);
        removeUser(socket.id);
        
        io.emit("getUsers", users);
    })
})
