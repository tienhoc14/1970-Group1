const express = require('express')
const async = require('hbs/lib/async')
const { getDB, ObjectId, insertObject } = require('../databaseHandler')
const { requireTrainee } = require('../projectLibrary')

const router = express.Router()

router.use(express.static('public'))

router.get('/', requireTrainee, (req, res) => {
    res.render('traineeIndex')
})

router.get('/viewMyCourse', requireTrainee, async(req, res) => {
    const user = req.session["Trainee"]

    const dbo = await getDB();
    const mycourse = []

    const course = await dbo.collection("Course").find({}).toArray()
    course.forEach(c => {
        if (c.trainees.includes(user.name)) {
            mycourse.push(c)
        }
    });

    res.render("viewMyCourse", { course: mycourse })
})

router.get('/viewClass', requireTrainee, async(req, res) => {
    const user = req.session["Trainee"]

    const dbo = await getDB();
    const mycourse = []

    const course = await dbo.collection("Course").find({}).toArray()
    course.forEach(c => {
        if (c.trainees.includes(user.name)) {
            mycourse.push(c)
        }
    });

    res.render("viewClass", { course: mycourse })
})

router.get('/detail', requireTrainee, async (req,res)=>{
    const id = req.query.courseID
    const dbo = await getDB();
    const myclass = []

    const trainee = await dbo.collection("trainees").find({}).toArray()
    trainee.forEach(t=>{
        if (t.Course.includes(id)){
            myclass.push(t)
        }
    })
    res.render("detailClass", {classmate: myclass})
})

router.get('/join', requireTrainee, async(req, res) => {
    const user = req.session["Trainee"]
    const courseID = req.query.id

    const db = await getDB()
    const trainee = await db.collection("trainees").findOne({ "userName": user.name })
    const course = await db.collection("Course").findOne({ _id: ObjectId(courseID) })

    trainee.Course.push(course.courseID)
    const updateT = trainee.Course
    course.trainees.push(trainee.userName)
    const updateC = course.trainees

    await db.collection("trainees").updateOne({ "userName": user.name }, { $set: { "Course": updateT } })
    await db.collection("Course").updateOne({ _id: ObjectId(courseID) }, { $set: { "trainees": updateC } })
    res.render('join', { course: courseID })
})

router.get('/view', requireTrainee, async(req, res) => {
    const user = req.session["Trainee"]

    const dbo = await getDB()
    const info = await dbo.collection("trainees").findOne({ "userName": user.name });
    res.render("viewProfileTrainee", { trainee: info });
})

router.get('/update', requireTrainee, async(req, res) => {
    const user = req.session["Trainee"]

    const dbo = await getDB()
    const info = await dbo.collection("trainees").findOne({ "userName": user.name });
    res.render("updateProfileTrainee", { trainee: info });
})

router.post('/update', requireTrainee, async(req, res) => {
    const id = req.body.txtId
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;
    const addressInput = req.body.txtAddress;

    const UpdateTrainee = {
        $set: {
            name: nameInput,
            email: emailInput,
            age: ageInput,
            speciality: specialtyInput,
            address: addressInput,
        }
    }

    const filter = { _id: ObjectId(id) }
    const dbo = await getDB()
    await dbo.collection("trainees").updateOne(filter, UpdateTrainee)
    const info = await dbo.collection("trainees").findOne({ "_id": ObjectId(id) })
    res.render("viewProfileTrainee", { trainee: info });
})

router.get('/search', requireTrainee, async(req, res) => {
    const dbo = await getDB();
    const allCourse = await dbo.collection("Course").find({}).toArray();
    res.render("searchCourse", { data: allCourse })
})

router.post('/search', requireTrainee, async(req, res) => {
    const searchCoures = req.body.txtSearch;
    const dbo = await getDB();
    const allCourse = await dbo.collection("Course").find({ courseID: searchCoures }).toArray();
    res.render("searchCourse", { data: allCourse })
})
// Course Score



module.exports = router;