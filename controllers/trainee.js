const express = require('express')

const router = express.Router()

router.use(express.static('public'))

router.get('/',(req,res)=>{
    res.render('traineeIndex')
})

router.get('/viewClass', (req,res)=>{
    res.render("viewClassmates")
})

router.get('/viewMyCourse', (req,res)=>{
    res.render("viewCourse")
})

router.get('/update', (req,res)=>{
    res.render('updateProfile')
})

module.exports = router;