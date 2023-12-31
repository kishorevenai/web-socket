import express from 'express'
import { Server } from "socket.io"
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


console.log('testing main')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static(path.join(__dirname,"public")))

const expressServer = app.listen(PORT , () => {    
    console.log(`Listening to port ${PORT}`)
})

const io = new Server(expressServer, {
    cors:{
        origin:process.env.NODE_ENV === "production" ? false : ["http://localhost:5500"]
    }
})

io.on('connection',socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('message',data => {
        io.emit('message',`${socket.id.substring(0,5)}: ${data}`)
    })

    socket.on('typing' , (data) => {
        if(data.typing === true) {
            io.emit('display',"typing")
        }
        else {
            io.emit('display',data)
        }
    })
})


