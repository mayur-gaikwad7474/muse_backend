const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')
const template = require('./Schema/Template')
const fs = require('fs')
const app = express()


// connect to the data base
try {
    mongoose.connect('mongodb://localhost:27017/muse',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
} catch (error) {
    console.log(error)
}

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use('/muse', require('./Routes/Template'))
app.use('/muse', require('./Routes/AdminTemplate'))
app.use('/muse/svg', require('./Routes/Svg'))
app.use('/muse/user', require('./Routes/Useruploads'))


const server = http.createServer(app)
const io = socketio(server)

// run when the client connectes
io.on('connection', socket => {
    //listen for the arrary of elements
    socket.on('saveChanges', async (msg) => {
        try {
            const data = await template.findOne({ design_id: msg.design_id })
            if (data === null) {
                const unique = Date.now()
                const base64Data = msg.imageData.replace(/^data:image\/jpeg;base64,/, "");
                const fileName = "./Images/" + unique + ".jpeg"
                msg.image_url = "https://muse.creatosaurus.io/muse/user/image/" + unique + ".jpeg"
                fs.writeFile(fileName, base64Data, 'base64', (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
                await template.create(msg)
            } else {
                let fileToUpdate = data.image_url.split('/')
                const base64Data = msg.imageData.replace(/^data:image\/jpeg;base64,/, "");
                const fileName = "./Images/" + fileToUpdate.pop()
                fs.writeFile(fileName, base64Data, 'base64', (error) => {
                    if (error) {
                      console.log(error)
                    }
                })
                data.design = msg.design
                data.save()
            }
        } catch (error) {

        }
    })
})

// run the app
server.listen(4003 || process.env.PORT, () => {
    console.log("listening on port 4003")
})