const express = require('express')
const router = express.Router()
const { getDB, InsertTrainee, DeleteTrainee, UpdateTrainee, ObjectId,insertObject } = require('../databaseHandler');
const { requireStaff } = require('../projectLibrary');
router.use(express.static('public'))

router.get('/staffPage', requireStaff, async(req, res) => {
    const db = await getDB();
    const viewTrainees = await db.collection("trainees").find({}).toArray();
    res.render('staffPage', { data: viewTrainees });
})
router.get('/addTrainee', requireStaff, (req, res) => {
    res.render("addTrainee")
})
router.post('/addTrainee', requireStaff, async(req, res) => {
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;
    const addressInput = req.body.txtAddress;

    const newTrainee = { name: nameInput, email: emailInput, age: ageInput, specialty: specialtyInput, address: addressInput };
    InsertTrainee(newTrainee)

    res.redirect('staffPage');
})
router.get('/deteleTrainee', requireStaff, (req, res) => {
    const id = req.query.id;

    DeleteTrainee(id);

    res.redirect('staffPage');
})
router.get('/editTrainee', requireStaff, async(req, res) => {
    const id = req.query.id;

    const db = await getDB();
    const t = await db.collection("trainees").findOne({ _id: ObjectId(id) });

    res.render('editTrainee', { trainee: t });
})
router.post('/updateTrainee', requireStaff, async(req, res) => {
    const id = req.body.txtId;
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;
    const addressInput = req.body.txtAddress;

    UpdateTrainee(id, nameInput, emailInput, ageInput, specialtyInput, addressInput);

    res.redirect('staffPage');
})
router.get('/assignTrainer', requireStaff, (req, res) => {

})
//Insert course: Cuong
router.get('/viewCourse', async(req, res) => {
    const db = await getDB();
    const viewTrainees = await db.collection("Course").find({}).toArray();
    res.render('viewCourse', { course: viewTrainees });
})

router.get('/addCourse', (req, res) => {
    res.render('addCourse')
})
router.post('/addCourse', (req, res) => {
    const courseIDInput = req.body.txtCourseID;
    const courseName = req.body.txtNameCourse;
    const tutorInput = req.body.txtTutor;
    const categoryCourse = req.body.txtCategoryCourse;
    const descriptionCourse = req.body.txtDescription;

    const InsertCourse = {
        courseID: courseIDInput,
        courseName: courseName,
        tutor: tutorInput,
        categoryCourse: categoryCourse,
        descriptionCourse: descriptionCourse,
    }

    insertObject('Course', InsertCourse)

    res.redirect('viewCourse');
})


router.get('/assignTrainer', (req, res) => {
    res.render('assignTrainer')
})

router.get('/assignTrainee', requireStaff, (req, res) => {
    res.render('assignTrainee')
})

//Minh:

router.get('/addTrainerForCourses', (req, res) => {
    res.render('addTrainerForCourses')
})

module.exports = router;
