import { io } from "socket.io-client"

// import { io } from "socket.io-client"
const joinRoomButton = document.getElementById("room-button")
const messageInput = document.getElementById("message-input")
const roomInput = document. getElementById("room-input")
const form =  document.getElementById("form")
form.addEventListener("submit", e => {
    e. preventDefault()
    const message = messageInput.value
    const room = roomInput.value
    if (message === "") return 
    displayMessage(message)
    socket.emit("send-message", message , room)
    messageInput.value = ""
})

const socket = io('http://localhost:3003')
// we can also use our custom events.. 'connect' is a event that is run every time we connect to our server
// and the are the events commit from the server
socket.on('connect',()=> {
  //the id which we connected to the server with
  displayMessage(`you connected with id: ${socket.id}`)
})
joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value
  socket.emit('join-room', room ,message=>{
    displayMessage(message)
  }) 
})

socket.on('receive-message', message=> {
  displayMessage(message)
})
// sending events from the client to the server
// socket.emit("custom-event", 10, 'HI' , {a: 'a'})

function displayMessage(message) {
    const div = document.createElement("div")
    div.textContent = message
    document.getElementById("message-container").append(div)
} 