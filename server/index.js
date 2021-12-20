import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import route from './routes/Router.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
//Cannot use import statement outside a module. We get this error for this type of import.
//We need to write "type":"module" in package.json to resolve this.
dotenv.config();

const app = express();
const server = http.createServer(app)
app.use(cors());
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({extended: true }))

app.use('/', route);

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
Connection(username, password);

const PORT = 8000 || process.env.PORT;
app.listen(PORT || process.env.PORT, () => {
    console.log(`Server connected on port ${PORT}`)
})

const io = new Server(server)

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
    console.log("User Connected")
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
        console.log("User Disconnected");
        removeUser(socket.id)
        io.emit('getUsers',users)
    })

})

