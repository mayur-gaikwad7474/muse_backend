const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')
const cors = require('cors')
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
app.use('/muse',require('./Routes/Template'))
app.use('/muse',require('./Routes/AdminTemplate'))
app.use('/muse/svg',require('./Routes/Svg'))

// run the app
app.listen(4003 || process.env.PORT, () => {
    console.log("listening on port 4003")
})