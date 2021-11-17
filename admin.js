const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('adminIndex')
})

router.get('/addStaff',(req,res)=>{
    res.render('addStaff')
})

router.get('/addTrainer',(req,res)=>{
    res.render('addTrainer')
})

module.exports = router;

