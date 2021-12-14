const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router()
const { getDB, InsertTrainee, DeleteTrainee, UpdateTrainee, ObjectId, insertObject } = require('../databaseHandler');
const { requireStaff } = require('../projectLibrary');
router.use(express.static('public'))

router.get('/staffPage', requireStaff, async (req, res) => {
    const db = await getDB();
    const viewTrainees = await db.collection("trainees").find({}).toArray();
    res.render('staffPage', { data: viewTrainees });
})
router.get('/addTrainee', requireStaff, (req, res) => {
    res.render("addTrainee")
})
router.post('/addTrainee', requireStaff, async (req, res) => {
    const userName = req.body.txtUser;
    const passWord = req.body.txtPass;
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;
    const addressInput = req.body.txtAddress;

    const newAccountTrainee = {
        username: userName,
        role: 'Trainee',
        password: passWord,
        name: nameInput,
        email: emailInput,
        age: ageInput,
        specialty: specialtyInput,
        address: addressInput
    }
    insertObject('trainees', newAccountTrainee)
    res.redirect('staffPage');
})
router.get('/deteleTrainee', requireStaff, (req, res) => {
    const id = req.query.id;

    DeleteTrainee(id);

    res.redirect('staffPage');
})
router.get('/editTrainee', requireStaff, async (req, res) => {
    const id = req.query.id;

    const db = await getDB();
    const t = await db.collection("trainees").findOne({ _id: ObjectId(id) });

    res.render('editTrainee', { trainee: t });
})
router.post('/updateTrainee', requireStaff, async (req, res) => {
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
router.get('/viewCourse', async (req, res) => {
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

// Nam: course category

router.get('/viewCourseCategory', async (req, res) => {
    const db = await getDB();
    const viewCourseCategorys = await db.collection("CourseCategory").find({}).toArray();
    res.render('viewCoursecategory', { course_cagtegory: viewCourseCategorys });
})

router.get('/addCourseCategory', (req, res) => {
    res.render('addCourseCategory')
})
router.post('/addCourseCategory', (req, res) => {
    const coursecategory_ID = req.body.txtCourseCategoryID;
    const coursecategory_Name = req.body.txtCourseCategoryName;
    const description_CourseCategory = req.body.txtDescriptionCourseCategory;

    const InsertCourseCategory = {
        courseCategoryID: coursecategory_ID,
        courseCategoryName: coursecategory_Name,
        descriptionCourseCategory: description_CourseCategory,
    }

    insertObject('CourseCategory', InsertCourseCategory)

    res.redirect('viewCourseCategory');
})

router.post('/editCourseCategory', requireAdmin, async(req, res) => {
    const coursecategory_ID = req.body.txtCourseCategoryID;
    const coursecategory_Name = req.body.txtCourseCategoryName;
    const description_CourseCategory = req.body.txtDescriptionCourseCategory;

    const updateToCourseCategory = {
        $set: {
            courseCategoryID: coursecategory_ID,
            courseCategoryName: coursecategory_Name,
            descriptionCourseCategory: description_CourseCategory,
        }
    }
    const filter = { _id: ObjectId(id) }
    const dbo = await getDB()
    await dbo.collection("CourseCategory").updateOne(filter, updateToCourseCategory)

    const category = await dbo.collection("Category").findOne({ "_id": ObjectId(id) })
    res.render('viewCourseCategory', { course_cagtegory: category })
})

//End code
router.get('/assignTrainer', (req, res) => {
    res.render('assignTrainer')
})

router.get('/assignTrainee', requireStaff, (req, res) => {
    res.render('assignTrainee')
})

//Minh:


router.get('/addTraineeForCourses', async (req, res) => {
    const db = await getDB();
    const viewTrainees = await db.collection("Course").find({}).toArray();
    res.render('addTraineeForCourses', { course: viewTrainees });
})

router.get('/showTrainees', async (req, res) => {
    const id = req.query.id;
    const db = await getDB();
    const c = await db.collection("Course").findOne({ _id: ObjectId(id) });
    res.render('showTrainees', { course: c });
})



router.get('/addTrainerForCourses', async (req, res) => {
    const db = await getDB();
    const viewCourses = await db.collection("Trainers").find({}).toArray();
    console.log(viewCourses)
    res.render('addTrainerForCourses', { trainer: viewCourses });

})


router.get('/showCourses', async (req, res) => {
    const id = req.query.id;
    const db = await getDB();
    const t = await db.collection("Trainers").findOne({ _id: ObjectId(id) });
    const courses = await db.collection("Course").find({}).toArray();

    res.render('showCourses', { trainer: t, c: courses });
})

router.post('/addCoursesToTrainer', async (req, res) => {
    const id = req.body.txtID;
    const courseID = req.body.CB;
    const dbo = await getDB();
    const filter = { _id: ObjectId(id) }
    const coursesToTrainer = {
        $set: {
            Courses: courseID
        }
    }
    await dbo.collection("Trainers").updateOne(filter, coursesToTrainer)
    
    console.log(courseID)
    res.redirect('/staff/addTrainerForCourses')
})

module.exports = router;
