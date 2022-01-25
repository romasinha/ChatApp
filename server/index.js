const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const {addUser, removeUser,getUser, getUsersInRoom} =  require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require('./router')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);
//socket io code
io.on('connect', (socket)=>{
    socket.on('join', ({name, room}, callback)=>{
        const {error, user} = addUser({id:socket.id, name, room});

        if(error) return callback(error);

        socket.emit('message', {user: 'admin', text: `${user.name}, Welcome to ${user.room}`})
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has joined the!`})

        socket.join(user.room);
        callback();
    })

    socket.on('sendMessage', (message,callback)=>{
       const user = getUser(socket.id);

       io.to(user.room).emit('message', {user: user.name, text: message});

       callback();
    })

    socket.on('disconnect', ()=>{
        console.log("user has left");
    })
})



server.listen(PORT, ()=>
    console.log(`Server started on port ${PORT}`)
);