const socket = io.connect('http://localhost:4000')

var message = document.getElementById('message');
var username = document.getElementById('name');
var send_button = document.getElementById('send_button');
var output = document.getElementById('output');
var typing_status = document.getElementById('typing_status');

send_button.addEventListener('click', () => {
    socket.emit('chat', { message: message.value, username: username.value })
})


socket.on('chat', data => {
    typing_status.innerHTML = ''
    output.innerHTML += `<p><strong>${data.username}:</strong> ${data.message}</p>`
})

message.addEventListener('keypress', () => {
    socket.emit('typing', username.value)
})

socket.on('typing', data => {
    typing_status.innerHTML = `<p><em>${data} is a typing...</em></p>`
})
