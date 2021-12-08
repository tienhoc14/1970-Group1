const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('staffIndex')
})

router.get('/assignTrainer',(req,res)=>{
    res.render('assignTrainer')
})

router.get('/assignTrainee',(req,res)=>{
    res.render('assignTrainee')
})

module.exports = router;