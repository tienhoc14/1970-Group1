const express = require('express')
const async = require('hbs/lib/async')
const { getDB, UpdateTrainee, ObjectId, } = require('../databaseHandler')
const { requireTrainee } = require('../projectLibrary')

const router = express.Router()

router.use(express.static('public'))

router.get('/', requireTrainee, (req, res) => {
    res.render('traineeIndex')
})

router.get('/viewClass', requireTrainee, (req, res) => {
    // const searchInput = req.body.txtSearch;

    // const dbo = await getDB();
    // const viewClass = await dbo.collection('').find({classId: searchInput}).toArray();
    res.render("viewClassmates")
})

router.get('/viewMyCourse', requireTrainee, (req, res) => {
    res.render("viewCourse")
})

router.get('/update', requireTrainee, async(req, res) => {
    const user = req.session["Trainee"]
    const db = await getDB();
    const info = await db.collection("trainees").findOne({"name": user.name});

    res.render('updateProfileTrainee', { trainee: info });
})

router.get('/view', requireTrainee, async(req, res) => {
    const id = req.query.id
    const user = req.session["Trainee"]
    const db = await getDB();
    const info = await db.collection("trainees").findOne({"_id": ObjectId(id)});

    res.render("viewProfileTrainee", { trainee: info });
})

router.post('/update', requireTrainee, async(req, res) => {
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;
    const addressInput = req.body.txtAddress;

    const updateTrainee ={
        $set:{
            name: nameInput,
            age: ageInput,
            email: emailInput,
            specicalty: specialtyInput,
            address: addressInput
        }
    }

    session["Trainee"] = {name: user};

    const filter = { _id: ObjectId(id) }
    const db = await getDB();
    const info = await db.collection("trainees").updateOne({filter, updateTrainee});

    res.render("viewProfileTrainee", { trainee: info });
})

router.get('/search', requireTrainee, async (req, res)=>{

    const dbo = await getDB();
    const allCourse = await dbo.collection("Course").find({}).toArray();
    res.render("searchCourse", {data: allCourse})
})

router.post('/search', requireTrainee, async (req, res) => {
    // const searchCoures = req.body.txtSearch;
    // const dbo = await getDB();
    // const allCourse = await dbo.collection("Course").find({courseID: searchCoures}).toArray();
    // res.render("searchCourse", {data: allCourse})
    res.render("searchCour")
})


module.exports = router;