import {Server} from 'socket.io';


const PORT = 9000 || process.env.PORT;

const io = new Server(PORT, {
    cors: {
        origin: "http://localhost:3000" //To allow cors policy from react server
    }
})
let users = [];
//socketId is created by socket for each value
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId })
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

const removeUser = (socketId) => {
    users = users.filter(user=>user.socketId!==socketId)
}

//To setup a connection with socket, on function is used
io.on('connection', (socket) => {   
    console.log("Socket Connected")
    //connect
    socket.on('addUsers', userId => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    //send message
    socket.on('sendMessage', ({ senderId, receiverId, textValue }) => {
        const receiver = getUser(receiverId)
        receiver && io.to(receiver.socketId).emit('getMessage',{
            senderId,
            textValue
        })
    })

    //disconnect
    socket.on('disconnect',()=>{
        console.log("Socket Disconnected");
        removeUser(socket.id)
        io.emit('getUsers',users)
    })

})

