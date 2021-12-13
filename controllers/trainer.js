const express = require('express')
const { insertObject } = require('../databaseHandler')
const { requireTrainer } = require('../projectLibrary')
const router = express.Router()

router.get('/', requireTrainer, (req, res) => {
    res.render('trainerIndex')
})

router.get('/profileTrainer', requireTrainer, (req, res) => {
    const user = req.session["User"]
    res.render('profileTrainer', { userInfo: user })
})

router.get('/detailCourse', requireTrainer, (req, res) => {
    const user = req.session["User"]
    res.render('detailCourse', { userInfo: user })
})

router.get('/scoring', requireTrainer, (req, res) => {
    const user = req.session["User"]
    res.render('scoring', { userInfo: user })
})

module.exports = router;