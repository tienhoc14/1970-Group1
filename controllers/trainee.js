const express = require('express')
const { getDB } = require('../databaseHandler')

const router = express.Router()

router.use(express.static('public'))

router.get('/',(req,res)=>{
    res.render('traineeIndex')
})

router.get('/viewClass', (req,res)=>{
    // const searchInput = req.body.txtSearch;
    
    // const dbo = await getDB();
    // const viewClass = await dbo.collection('').find({classId: searchInput}).toArray();
    res.render("viewClassmates")
})

router.get('/viewMyCourse', (req,res)=>{
    res.render("viewCourse")
})

router.get('/update', (req,res)=>{
    res.render('updateProfile')
})

router.get('/search', (req,res)=>{
    res.render("searchCourse")
})

module.exports = router;