const express = require('express')
const router = express.Router()
const {ViewTrainees, InsertTrainee } = require('../databaseHandler')


router.get('/staffPage',(req,res)=>{
    res.render('staffPage',{data:ViewTrainees()});
})
router.get('/addTrainee',(req,res)=>{
    res.render("addTrainee")
})
router.post('/addTrainee',async(req,res)=>{
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;

    const newTrainee = {name: nameInput, email: emailInput, age: ageInput,specialty: specialtyInput};
    InsertTrainee(newTrainee)

    res.render('staffPage');
})


router.get('/assignTrainer',(req,res)=>{
    res.render('assignTrainer')
})

router.get('/assignTrainee',(req,res)=>{
    res.render('assignTrainee')
})

module.exports = router;