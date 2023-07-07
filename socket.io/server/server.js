
const {instrument} = require('@socket.io/admin-ui')

const io = require('socket.io')(3003,{
    cors: ['http://localhost:8080' , 'http://192.168.1.224:8080' , 'https://admin.socket.io/']
})

io.on("connection",socket=>{
    // which is assigned by the server for every connection
    console.log(socket.id);
    // listerning for custom events emited by client
    socket.on('send-message', (message, room)=>{
        // this io.emit will send the message to all the client including the sender 
        // io.emit('receive-message', message)
        if(room === ''){ 
        //we can use socket.broadcast.emit that will send the mesage to every other socket other than me.
        socket.broadcast.emit('receive-message', message)
        console.log(message);
        } else {
            //this will send the message including us rather we can use .broadcast
            socket.to(room).emit('receive-message', message)
            // socket.broadcast.to(room).emit('receive-message', message)
        }
    })
        //creating custom rooms and joining rooms
        socket.on('join-room', (room ,func) => {
            socket.join(room)
            func(`joined ${room}`)
        })
})

instrument(io, { auth: false})