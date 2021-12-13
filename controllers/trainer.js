const express = require('express')
const { insertObject } = require('../databaseHandler')
const { requiresLogin } = require('../projectLibrary')
const router = express.Router()

router.get('/',requiresLogin,(req,res)=>{
    const user = req.session["User"]
    res.render('trainerIndex', { userInfo: user })
})

router.get('/profileTrainer',requiresLogin,(req,res)=>{
    const user = req.session["User"]
    res.render('profileTrainer', { userInfo: user })
})

router.get('/detailCourse',requiresLogin,(req,res)=>{
    const user = req.session["User"]
    res.render('detailCourse', { userInfo: user })
})

router.get('/scoring',requiresLogin,(req,res)=>{
    const user = req.session["User"]
    res.render('scoring', { userInfo: user })
})

module.exports = router;