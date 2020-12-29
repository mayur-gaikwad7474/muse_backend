const express = require('express')
const router = express.Router()
const template = require('../Schema/Template')
const fs = require('fs')
const path = require('path')

router.post('/create/template', async (req, res) => {
    try {
        const unique = Date.now()
        const base64Data = req.body.imageData.replace(/^data:image\/jpeg;base64,/, "");
        const fileName = "./Images/" + unique + ".jpeg"
        req.body.image_url = "http://localhost:4001/muse/images/" + unique + ".jpeg"
        fs.writeFile(fileName, base64Data, 'base64', (error) => {
            if (error) {
                res.status(500).json({
                    error: error
                })
            }
        })
        await template.create(req.body)
        res.status(201).json({
            message: "template created"
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/templates', async (req, res) => {
    try {
        const data = await template.find({})
        res.send(data)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/images/:fileName', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, `../Images/${req.params.fileName}`))
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

module.exports = router