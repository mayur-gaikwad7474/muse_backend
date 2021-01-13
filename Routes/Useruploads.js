const express = require('express')
const router = express.Router()
const images = require('../Schema/Useruploads')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './UserUploads')
    },
    filename: function (req, file, cb) {
        let typeFilterArray = file.mimetype.split('/')
        let type = typeFilterArray.pop()
        cb(null, Date.now() + "." + type)
    }
})
const upload = multer({ storage: storage })

router.post('/upload/image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).json({
                message: "file not found"
            })
        } else {
            req.body.file_name = req.file.filename
            req.body.url = "https://muse.creatosaurus.io/muse/user/image/" + req.file.filename
            const data = await images.create(req.body)
            res.send(data)
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/image/:fileName', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, `../UserUploads/${req.params.fileName}`))
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/images/:id', async (req, res) => {
    try {
       const data = await images.find({ user_id: req.params.id })
       res.send(data)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/images/find/all', async (req, res) => {
    try {
       const data = await images.find({})
       res.send(data)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

module.exports = router
