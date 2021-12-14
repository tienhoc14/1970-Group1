const express = require('express')
const { insertObject, getDB } = require('../databaseHandler')
const { requireTrainer } = require('../projectLibrary')
const router = express.Router()

router.get('/', requireTrainer, (req, res) => {
    res.render('trainerIndex')
})

router.get('/detailCourse', requireTrainer, (req, res) => {
    const user = req.session["User"]
    res.render('detailCourse', { userInfo: user })
})

router.get('/scoring', requireTrainer, (req, res) => {
    const user = req.session["User"]
    res.render('scoring', { userInfo: user })
})

router.get('/profileTrainer', requireTrainer, async(req, res) => {
    const user = req.session["Trainer"]
    const dbo = await getDB()
    const trainer = await dbo.collection("Trainers").findOne({ "userName": user.name })

    res.render('profileTrainer', { data: trainer })
})

module.exports = router;