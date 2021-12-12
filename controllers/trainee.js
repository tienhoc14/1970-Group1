const express = require('express')
const { getDB, UpdateTrainee, ObjectId } = require('../databaseHandler')

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

router.get('/update', async(req,res)=>{
    const id = req.query.id;

    const db = await getDB();
    const info = await db.collection("trainees").findOne({ _id: ObjectId(id) });
    
    res.render('updateProfile', {trainee: info});
})

router.post('/update',async(req, res)=>{
    const id = req.body.txtId;
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;
    const addressInput = req.body.txtAddress;

    UpdateTrainee(id, nameInput, emailInput, ageInput,specialtyInput,addressInput);

    res.redirect('/trainee');
})
router.get('/search', (req,res)=>{
    res.render("searchCourse")
})

module.exports = router;