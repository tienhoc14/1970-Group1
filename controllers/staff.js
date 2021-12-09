const express = require('express')
const router = express.Router()
const {getDB, InsertTrainee,DeleteTrainee } = require('../databaseHandler')


router.get('/staffPage',async(req,res)=>{
    const db = await getDB();
    const viewTrainees = await db.collection("trainees").find({}).toArray();
    res.render('staffPage',{data:viewTrainees});
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

    res.redirect('staffPage');
})
router.get('/deleteTrainee',(req,res)=>{
    const id = req.query.id;

    DeleteTrainee(id);

    res.redirect('staffPage');
})

router.get('/assignTrainer',(req,res)=>{
    res.render('assignTrainer')
})

router.get('/assignTrainee',(req,res)=>{
    res.render('assignTrainee')
})

module.exports = router;