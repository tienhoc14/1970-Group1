const express = require('express')
const async = require('hbs/lib/async')
const { insertObject, getDB, ObjectId } = require('../databaseHandler')
const { requireTrainer } = require('../projectLibrary')
const router = express.Router()

router.use(express.static('public'))

router.get('/', requireTrainer, async(req, res) => {
    const user = req.session["Trainer"]
    const dbo = await getDB()
    const view = await dbo.collection("Trainers").findOne({ "userName": user.name })

    res.render('trainerIndex', { user: user, courses: view.Courses })
})

router.get('/detailCourse', requireTrainer, async(req, res) => {
    const user = req.session["Trainer"]
    const courseID = req.query.courseID
    const dbo = await getDB()
    const view = await dbo.collection("Course").findOne({ "courseID": courseID })

    res.render('detailCourse', { user: user, t: view.trainees, o: courseID })
})

router.get('/scoring', requireTrainer, async(req, res) => {
    const user = req.session["Trainer"]
    const nameTrainee = req.query.userName
    const dbo = await getDB()
    const t = await dbo.collection("trainees").findOne({ "userName": nameTrainee })
    res.render('scoring', { user: user, t: t })
})

router.post('/traineeScoring', requireTrainer, async(req, res) => {
    const id = req.body.txtID;
    const sl = req.body.SL

    const scoring = {
        Trainee: id,
        score: sl
    }
    insertObject("CourseScore", scoring)
    res.redirect('/trainer/showScore')
})

router.get('/showScore', requireTrainer, async(req, res) => {
    const user = req.session["Trainer"]

    const dbo = await getDB()
    const score = await dbo.collection("CourseScore").find({}).toArray()
    console.log(score)
    res.render('showScore', { user: user, data: score })
})

router.get('/profileTrainer', requireTrainer, async(req, res) => {

    const nameTrainee = req.query.userName

    const sl = req.body.SL 
    
    const dbo = await getDB();
    // const course = await dbo.collection("Course").find({ }).toArray();
    // const trainee = await dbo.collection("trainees").find({ }).toArray();
    const t = await dbo.collection("trainees").findOne({ "userName": nameTrainee })
    console.log()
    // // const scoring = { 
    // //     // course : course.courseID,
    // //     trainee: trainee.user,
    // //     score: sl
    // // }
    // insertObject("CourseScore", scoring)
    res.render("showScore", {user: user} );
})

router.post('/scoringTrainee',requireTrainer, async (req, res) => {
    const id = req.body.txtID;
    const username = req.body.txtUser;
    const sl = req.body.SL;
    
    const dbo = await getDB();
    const trainee = await dbo.collection("trainees").find({ userName : username }).toArray();
    const filter = { _id: ObjectId(id) }
    const scoring = {
        $set: {
            coursescoreId: id,
            trainee : trainee,
            score: sl
    }}
    await dbo.collection("CourseScore").updateOne(filter, scoring)
    res.render('showScore', { courseid: id, trainee: trainee, score : sl })

})

router.get('/profileTrainer', requireTrainer, async (req, res) => {
    const user = req.session["Trainer"]
    const dbo = await getDB()
    const trainer = await dbo.collection("Trainers").findOne({ "userName": user.name })

    res.render('profileTrainer', { data: trainer, user: user })
})


router.get('/updateProfileTrainer', requireTrainer, async(req, res) => {
    const user = req.session["Trainer"]
    const dbo = await getDB()
    const trainer = await dbo.collection("Trainers").findOne({ "userName": user.name })
    res.render('updateProfileTrainer', { data: trainer, user: user })
})

router.post('/updateProfileTrainer', requireTrainer, async(req, res) => {
    const user = req.session["Trainer"]
    const id = req.body.txtId
    const name = req.body.trainerName
    const age = req.body.trainerAge
    const phone = req.body.phone
    const spec = req.body.spec
    const address = req.body.address

    const updateToTrainers = {
        $set: {
            name: name,
            age: age,
            speciality: spec,
            address: address,
            phone_number: phone
        }
    }
    const filter = { _id: ObjectId(id) }
    const dbo = await getDB()
    await dbo.collection("Trainers").updateOne(filter, updateToTrainers)

    const trainer = await dbo.collection("Trainers").findOne({ "userName": user.name })
    res.render('profileTrainer', { data: trainer, user: user })
})

module.exports = router;