const express = require('express')
const router = express.Router()

router.get('/staffIndex',(req,res)=>{
    res.render('staffIndex')
})

router.get('/assignTrainer',(req,res)=>{
    res.render('assignTrainer')
})

router.get('/assignTrainee',(req,res)=>{
    res.render('assignTrainee')
})