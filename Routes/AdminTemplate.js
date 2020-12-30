const express = require('express')
const router = express.Router()
const adminTemplate = require('../Schema/AdminTemplate')
const fs = require('fs')
const path = require('path')

router.post('/admin/create/template', async (req, res) => {
    try {
        const unique = Date.now()
        const base64Data = req.body.imageData.replace(/^data:image\/jpeg;base64,/, "");
        const fileName = "./TemplateImages/" + unique + ".jpeg"
        req.body.image_url = "http://muse.creatosaurus.io/muse/admin/images/" + unique + ".jpeg"
        fs.writeFile(fileName, base64Data, 'base64', (error) => {
            if (error) {
                res.status(500).json({
                    error: error
                })
            }
        })
        await adminTemplate.create(req.body)
        res.status(201).json({
            message: "template created"
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/admin/templates', async (req, res) => {
    try {
        const data = await adminTemplate.find({})
        res.send(data)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/admin/images/:fileName', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, `../TemplateImages/${req.params.fileName}`))
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})


module.exports = router