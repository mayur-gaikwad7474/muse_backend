const express = require('express')
const router = express.Router()
const svg = require('../Schema/Svg')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './SvgElements')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".svg")
    }
})
const upload = multer({ storage: storage })

router.post('/upload', upload.single('element'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).json({
                message: "file not found"
            })
        } else {
            req.body.url = "https://muse.creatosaurus.io/muse/svg/" + req.file.filename
            const data = await svg.create(req.body)
            return res.status(201).json({
                message: data
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/:fileName', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, `../SvgElements/${req.params.fileName}`))
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/element/all', async (req, res) => {
    try {
        const data = await svg.find({})
        res.send(data)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

module.exports = router
