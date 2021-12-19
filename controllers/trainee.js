const express = require('express')
const async = require('hbs/lib/async')
const { getDB, ObjectId } = require('../databaseHandler')
const { requireTrainee } = require('../projectLibrary')

const router = express.Router()

router.use(express.static('public'))

router.get('/', requireTrainee, (req, res) => {
    res.render('traineeIndex')
})

router.get('/viewClass', requireTrainee, async(req, res) => {
    const db = await getDB();
    const viewTrainees = await db.collection("Course").find({}).toArray();
    res.render("viewClass",{ course: viewTrainees });
})

router.get('/viewMyCourse', requireTrainee, async (req, res) => {
    const user = req.session["Trainee"]

    const dbo = await getDB();
    const trainee = await dbo.collection("trainees").findOne({"userName": user.name})
    res.render("viewMyCourse", {data: trainee.Courses})
})
router.post('/joinCourse', async(req, res) => {
    const id = req.body.txtID;
    const courseID = req.body.CB;
    const dbo = await getDB();
    const filter = { _id: ObjectId(id) }
    const traineeAssignCourse = {
        $set: {
            Courses: courseID
        }
    }
    await dbo.collection("Trainers").updateOne(filter, traineeAssignCourse)

    res.redirect('viewMyCourse')
})
router.get('/joinCourse', requireTrainee, async (req,res)=>{
    const id = req.query.id;
    const user = req.session["Trainee"]

    const db = await getDB();
    const me = await db.collection("trainees").findOne({ "userName": user.name });
    const course = await db.collection("Course").findOne({ _id: ObjectId(id) });

    const newCourses = [];
    const newTrainees = [];
    if(!Array.isArray(me.Courses) || !Array.isArray(course.traineeName)){
        me.Courses = [me.Courses]
        course.traineeName = [course.traineeName]
        newCourses.push(me.courseID)
        newTrainees.push(course.name)
    }else{
        if(me.Courses == null || course.traineeName == null){
            newCourses.push(me.courseID)
            newTrainees.push(course.name)
        }else{
            course.forEach(c=>{
                if(!me.Courses.includes(c.courseID)){
                    me.forEach(m=>{
                        if(!course.traineeName.includes(m.name)){
                            newCourses.push(me.courseID)
                            newTrainees.push(course.name)
                        }
                    })
                    
                }
            })
        }
    }
    res.render('viewMyCourse', { trainee: me, new: newCourses, course:course });
});

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

module.exports = router;