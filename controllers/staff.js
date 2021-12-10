const express = require('express')
const router = express.Router()
const {getDB, InsertTrainee,DeleteTrainee,UpdateTrainee,ObjectId } = require('../databaseHandler')


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
    const addressInput = req.body.txtAddress;

    const newTrainee = {name: nameInput, email: emailInput, age: ageInput,specialty: specialtyInput,address: addressInput};
    InsertTrainee(newTrainee)

    res.redirect('staffPage');
})
router.get('/deteleTrainee',(req,res)=>{
    const id = req.query.id;

    DeleteTrainee(id);

    res.redirect('staffPage');
})
router.get('/editTrainee',async(req,res)=>{
    const id = req.query.id;

    const db = await getDB();
    const t = await db.collection("trainees").findOne({ _id: ObjectId(id) });
    
    res.render('editTrainee',{trainee: t});
})
router.post('/updateTrainee',async(req, res)=>{
    const id = req.body.txtId;
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;
    const addressInput = req.body.txtAddress;

    UpdateTrainee(id, nameInput, emailInput, ageInput,specialtyInput,addressInput);

    res.redirect('staffPage');
})

router.get('/assignTrainer',(req,res)=>{
    res.render('assignTrainer')
})

router.get('/assignTrainee',(req,res)=>{
    res.render('assignTrainee')
})

module.exports = router;