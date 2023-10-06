const socket = io('ws://localhost:3000')

function sendMessage(e) {
    e.preventDefault()
    const input = document.querySelector('input')
    if(input.value) {
        socket.emit('message',input.value)
        input.value = ""
    }
    input.focus() 
}

document.querySelector('form').addEventListener('submit',sendMessage)


//Listen for messages
socket.on ('message',(data) => {
    socket.on('display', () => {
        if(data.typing)     {
            const li = document.createElement('li')    
            li.textContent = "typing"
            document.querySelector('ul').appendChild(li)        
        }        
    })
    const li = document.createElement('li')    
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})
