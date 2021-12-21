const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router()
const { getDB, DeleteTrainee, UpdateTrainee, ObjectId, insertObject } = require('../databaseHandler');
const { requireStaff, requireTrainee } = require('../projectLibrary');
router.use(express.static('public'))

router.get('/staffPage', requireStaff, async(req, res) => {
    const db = await getDB();
    const viewTrainees = await db.collection("trainees").find({}).toArray();
    res.render('staffPage', { data: viewTrainees });
})

router.get('/profileStaff', requireStaff, async(req, res) => {
    const user = req.session["Staff"]
    const db = await getDB();
    const info = await db.collection("Staff").findOne({ "userName": user.name });

    res.render('profileStaff', { staff: info });
})

router.get('/updateProfileStaff', requireStaff, async(req, res) => {
    const user = req.session["Staff"]
    const db = await getDB();
    const info = await db.collection("Staff").findOne({ "userName": user.name });

    res.render('updateProfileStaff', { staff: info });
})
router.post('/updateProfileStaff', requireStaff, async(req, res) => {
    const id = req.body.txtId;
    const name = req.body.txtName;
    const age = req.body.txtAge;
    const email = req.body.txtEmail;
    const phone = req.body.txtPhone;
    const spec = req.body.txtSpecialty;
    const address = req.body.txtAddress;
    const filter = { _id: ObjectId(id) }
    const updateToStaffs = {
        $set: {
            name: name,
            age: age,
            email: email,
            speciality: spec,
            address: address,
            phone_number: phone
            
        }
    }

    const db = await getDB();
    await db.collection('Staff').updateOne(filter, updateToStaffs);
    const st = await db.collection('Staff').findOne({ _id: ObjectId(id) });

    res.render('profileStaff', { staff: st });
})

router.get('/viewTrainees', requireStaff, async(req, res) => {
    const db = await getDB();
    const viewTrainees = await db.collection("trainees").find({}).toArray();
    res.render('viewTrainees', { data: viewTrainees });
})
router.get('/addTrainee', requireStaff, (req, res) => {
    res.render("addTrainee")
})
router.post('/addTrainee', requireStaff, async(req, res) => {
    const userName = req.body.txtUser;
    const passWord = req.body.txtPass;
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;
    const addressInput = req.body.txtAddress;
    const Course = [];

    const newAccountTrainee = {
        userName: userName,
        role: 'Trainee',
        password: passWord
    }
    const newProfileTrainee = {
        name: nameInput,
        email: emailInput,
        age: ageInput,
        specialty: specialtyInput,
        address: addressInput,
        userName: userName,
        Course:Course
    }

    insertObject('Users', newAccountTrainee);
    insertObject('trainees', newProfileTrainee);

    res.redirect('viewTrainees');
})
router.get('/deteleTrainee', requireStaff, async(req, res) => {
    const trainee = req.query.userName;

    await DeleteTrainee(trainee);

    res.redirect('viewTrainees');
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

    res.redirect('viewTrainees');
})
router.post('/searchTrainee', requireStaff, async(req, res) => {
    const searchName = req.body.txtSearch;

    const db = await getDB();
    const searchTrainee = await db.collection("trainees").find({ name: searchName }).toArray();

    res.render('viewTrainees', { data: searchTrainee })
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
    const trainee = [];

    const InsertCourse = {
        courseID: courseIDInput,
        courseName: courseName,
        tutor: tutorInput,
        categoryCourse: categoryCourse,
        descriptionCourse: descriptionCourse,
        trainees: trainee
    }

    insertObject('Course', InsertCourse)

    res.redirect('viewCourse');
})

// Nam: course category

router.get('/viewCourseCategory', async(req, res) => {
    const db = await getDB();
    const viewCourseCategorys = await db.collection("CourseCategory").find({}).toArray();
    res.render('viewCoursecategory', { bas: viewCourseCategorys });
})

router.get('/addCourseCategory', requireStaff, (req, res) => {
    res.render('addCourseCategory')
})
router.post('/addCourseCategory', (req, res) => {
    const coursecategory_Name = req.body.txtCourseCategoryName;
    const description_CourseCategory = req.body.txtDescriptionCourseCategory;

    const InsertCourseCategory = {
        courseCategoryName: coursecategory_Name,
        descriptionCourseCategory: description_CourseCategory,
    }

    insertObject('CourseCategory', InsertCourseCategory)

    res.redirect('viewCourseCategory');
})

router.get('/updateCourseCategory', requireStaff, async(req, res) => {
    const id = req.query.id
    const dbo = await getDB()
    const coursecategory = await dbo.collection("CourseCategory").findOne({ "_id": ObjectId(id) })
    res.render('editCourseCategory', { bas : coursecategory })
})

router.post('/editCourseCategory', requireStaff, async(req, res) => {
    const id = req.body.txtId;
    const coursecategory_Name = req.body.txtCourseCategoryName;
    const description_CourseCategory = req.body.txtDescriptionCourseCategory;

    const updateToCourseCategory = {
        $set: {
            courseCategoryName: coursecategory_Name,
            descriptionCourseCategory: description_CourseCategory,
        }
    }
    const filter = { _id: ObjectId(id) }
    const dbo = await getDB()
    await dbo.collection("CourseCategory").updateOne(filter, updateToCourseCategory)

    const coursecategory = await dbo.collection("CourseCategory").findOne({ "_id": ObjectId(id) })
    res.render('viewCourseCategory', { bas : coursecategory })
})

router.get("/deleteCourseCategory", async (req, res) => {
    const id = req.query.id;
    const dbo = await getDB()
    await dbo.collection("CourseCategory").deleteOne({ "_id": ObjectId(id) });
    const category = await dbo.collection("CourseCategory").findOne({ "_id": ObjectId(id) })
    res.render('viewCourseCategory', { bas: category })
})

router.get('/searchCourseCategory', requireStaff, async(req, res) => {
    const dbo = await getDB();
    const allCourseCategory = await dbo.collection("CourseCategory").find({}).toArray();
    res.render("searchCourseCategory", { bas: allCourseCategory })
})

router.post('/searchCourseCategory', requireStaff, async(req, res) => {
    const searchCourseCategory = req.body.txtSearch;
    const dbo = await getDB();
    const allCourseCategory = await dbo.collection("CourseCategory").find({ courseCategoryName: searchCourseCategory }).toArray();
    res.render("searchCourseCategory", { bas: allCourseCategory })
})

//End code
router.get('/assignTrainer', (req, res) => {
    res.render('assignTrainer')
})

router.get('/assignTrainee', requireStaff, (req, res) => {
    res.render('assignTrainee')
})



//Minh:

router.get('/addTraineeForCourses', async(req, res) => {
    const db = await getDB();
    const viewTrainees = await db.collection("Course").find({}).toArray();
    res.render('addTraineeForCourses', { course: viewTrainees });
})

router.post('/addTraineesToCourse', async(req, res) => {
    const id = req.body.txtID;
    const userName = req.body.CB;
    const dbo = await getDB();
    const filter = { _id: ObjectId(id) }
    const traineeToCourse = {
        $set: {
            trainees: userName
        }
    }
    await dbo.collection("Course").updateOne(filter, traineeToCourse)

    res.redirect('/staff/addTraineeForCourses')
})

router.get('/showTrainees', async(req, res) => {
    const id = req.query.id;
    const db = await getDB();
    const o = await db.collection("Course").findOne({ _id: ObjectId(id) });
    const trainees = await db.collection("trainees").find({}).toArray();
    
    const newTrainees = []
    if (o.trainees == null) {
        trainees.forEach(e => {
            newTrainees.push(e.userName)
        });
    } else if (!Array.isArray(o.trainees)) {
        o.trainees = [o.trainees]
        trainees.forEach(e => {
            if (!o.trainees.includes(e.userName)) {
                newTrainees.push(e.userName)
            }
        });
    } else {
        trainees.forEach(e => {
            if (!o.trainees.includes(e.userName)) {
                newTrainees.push(e.userName)
            }
        });
    }

    res.render('showTrainees', { o: o, new: newTrainees });
})

router.get('/addTrainerForCourses', async(req, res) => {
    const db = await getDB();
    const viewCourses = await db.collection("Trainers").find({}).toArray();

    res.render('addTrainerForCourses', { trainer: viewCourses });

})

router.post('/addCoursesToTrainer', async(req, res) => {
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

    res.redirect('/staff/addTrainerForCourses')
})

router.get('/showCourses', async(req, res) => {
    const id = req.query.id;
    const db = await getDB();
    const t = await db.collection("Trainers").findOne({ _id: ObjectId(id) });
    const courses = await db.collection("Course").find({}).toArray();

    const newCourses = []
    if (t.Courses == null) {
        courses.forEach(c => {
            newCourses.push(c.courseID)
        });
    } else if (!Array.isArray(t.Courses)) {
        t.Courses = [t.Courses]
        courses.forEach(c => {
            if (!t.Courses.includes(c.courseID)) {
                newCourses.push(c.courseID)
            }
        });
    } else {
        courses.forEach(c => {
            if (!t.Courses.includes(c.courseID)) {
                newCourses.push(c.courseID)
            }
        });
    }

    res.render('showCourses', { trainer: t, new: newCourses });
})

//hoa
router.get('/delete', requireStaff, async(req, res)=>{
    const id = req.query.id;
    const dbo = await getDB();
    const d = await dbo.collection("Course").deleteOne({ "_id": ObjectId(id)});
    res.redirect("viewCourse")
})

module.exports = router;