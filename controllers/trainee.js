const express = require('express')
const async = require('hbs/lib/async') <<
    << << < HEAD
const { getDB, UpdateTrainee, ObjectId, ViewProfileTrainee } = require('../databaseHandler')
const { requireTrainee } = require('../projectLibrary') ===
    === =
    const { getDB, UpdateTrainee, ObjectId } = require('../databaseHandler') >>>
    >>> > eb3359b4e86af38709c6ea41d6d48e15f8e67a7e

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
    const id = req.query.id;

    const db = await getDB();
    const info = await db.collection("trainees").findOne({ _id: ObjectId(id) });

    res.render('updateProfileTrainee', { trainee: info });
})

router.post('/update', requireTrainee, async(req, res) => {
    const id = req.body.txtId;
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;
    const addressInput = req.body.txtAddress;

    UpdateTrainee(id, nameInput, emailInput, ageInput, specialtyInput, addressInput);

    res.redirect('/trainee/updateProfileTrainee');
})

router.get('/view', requireTrainee, async(req, res) => {
    const id = req.query.id;

    const db = await getDB();
    const info = await db.collection("trainees").findOne({ _id: ObjectId(id) });

    res.render("viewProfileTrainee", { trainee: info });
})

router.post('/view', requireTrainee, async(req, res) => {
    const id = req.body.txtId;
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;
    const addressInput = req.body.txtAddress;

    ViewProfileTrainee(id, nameInput, emailInput, ageInput, specialtyInput, addressInput);

    res.redirect('/trainee/viewProfileTrainee');
})

router.get('/search', requireTrainee, (req, res) => {
    res.render("searchCourse")
})

module.exports = router;