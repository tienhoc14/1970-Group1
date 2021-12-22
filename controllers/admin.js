const express = require('express')
const res = require('express/lib/response')
const { render } = require('express/lib/response')
const async = require('hbs/lib/async')
const { ObjectId } = require('mongodb')
const { insertObject, getDB, DeleteTrainer, DeleteStaff } = require('../databaseHandler')
const { requireAdmin } = require('../projectLibrary')
const router = express.Router()

router.use(express.static('public'))

router.get('/', requireAdmin, (req, res) => {
    const user = req.session["Admin"]
    res.render('adminIndex', { user: user })
})

// Trainer 

router.get('/manage_trainer', requireAdmin, async(req, res) => {
    const user = req.session["Admin"]
    const dbo = await getDB();
    const allTrainers = await dbo.collection('Trainers').find({}).toArray();
    res.render('manageTrainer', { data: allTrainers, user: user })
})

router.get('/update_admin', requireAdmin, async(req, res) => {
    const user = req.session["Admin"]
    const dbo = await getDB()
    const us = await dbo.collection("Users").findOne({ "userName": user.name })
    res.render('updateAdmin', { u: us })
})

router.post('/editAdmin', requireAdmin, async(req, res) => {
    const id = req.body.txtId
    const user = req.body.txtUser
    const pass = req.body.txtPass

    const update = {
        $set: {
            userName: user,
            password: pass
        }
    }

    req.session["Admin"] = { name: user }

    const filter = { _id: ObjectId(id) }
    const dbo = getDB();
    (await dbo).collection("Users").updateOne(filter, update)

    res.redirect("/admin")
})

router.get('/addTrainer', requireAdmin, (req, res) => {
    const user = req.session["Admin"]
    res.render('addTrainer', { user: user })
})

router.post('/addTrainer', requireAdmin, async(req, res) => {
    const name = req.body.trainerName
    const age = req.body.trainerAge
    const phone = req.body.phone
    const spec = req.body.spec
    const address = req.body.address
    const username = req.body.username
    const email = username + "@fpt.edu.vn"

    const objectToUsers = {
        userName: username,
        role: 'Trainer',
        password: '123'
    }
    const objectToTrainers = {
        name: name,
        age: age,
        email: email,
        speciality: spec,
        address: address,
        phone_number: phone,
        userName: username
    }

    insertObject("Users", objectToUsers)
    insertObject("Trainers", objectToTrainers)
    res.redirect('manage_trainer')
})

router.get('/delete_trainer', requireAdmin, async(req, res) => {
    const us = req.query.userName
    await DeleteTrainer(us);
    res.redirect('manage_trainer')
})

router.get('/reset_password', requireAdmin, async(req, res) => {
    const us = req.query.userName
    const dbo = await getDB();
    await dbo.collection("Users").updateOne({ 'userName': us }, { $set: { password: '123' } })
    res.redirect('manage_trainer')
})

router.get('/detail_trainer', requireAdmin, async(req, res) => {
    const id = req.query.id
    const user = req.session["Admin"]
    const dbo = await getDB()
    const trainer = await dbo.collection("Trainers").findOne({ "_id": ObjectId(id) })
    res.render('detailTrainer', { data: trainer, user: user })
})

router.get('/update_trainer', requireAdmin, async(req, res) => {
    const id = req.query.id
    const user = req.session["Admin"]
    const dbo = await getDB()
    const trainer = await dbo.collection("Trainers").findOne({ "_id": ObjectId(id) })
    res.render('editTrainer', { data: trainer, user: user })
})

router.post('/editTrainer', requireAdmin, async(req, res) => {
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

    const trainer = await dbo.collection("Trainers").findOne({ "_id": ObjectId(id) })
    res.render('detailTrainer', { data: trainer })
})

router.post('/search', async(req, res) => {
    const search = req.body.txtSearch
    const user = req.session["Admin"]
    const dbo = await getDB()
    const trainer = await dbo.collection("Trainers").findOne({ "userName": search })
    var noti = ""
    if (trainer == null) {
        noti = "There is no Trainer with username: " + search
    } else {
        noti = "Trainer Profile"
    }
    res.render('detailTrainer', { data: trainer, user: user, noti: noti })
})

// End Trainer

//staff  Nam
router.get('/addStaff', requireAdmin, (req, res) => {
    res.render('addStaff')
})

router.get('/manage_staff', requireAdmin, async(req, res) => {
    const dbo = await getDB();
    const allStaff = await dbo.collection('Staff').find({}).toArray();
    res.render('manageStaff', { base: allStaff })
})

router.post('/addStaff', (req, res) => {
    const name = req.body.staffName
    const age = req.body.staffAge
    const phone = req.body.staffPhone
    const specialty = req.body.staffSpecialty;
    const address = req.body.staffAddress;
    const username = req.body.username
    const email = username + "@fpt.edu.vn"

    const objectToUsers = {
        userName: username,
        role: 'Staff',
        password: '234'
    }
    const objectToStaff = {
        name: name,
        age: age,
        email: email,
        speciality: specialty,
        address: address,
        phone_number: phone,
        userName: username
    }

    insertObject("Users", objectToUsers)
    insertObject("Staff", objectToStaff)
    res.redirect('manage_staff')

})

router.get('/delete_staff', requireAdmin, async(req, res) => {
    const us = req.query.userName
    await DeleteStaff(us);
    res.redirect('manage_staff')
})

router.get('/reset_password', requireAdmin, async(req, res) => {
    const us = req.query.userName
    const dbo = await getDB();
    await dbo.collection("Users").updateOne({ 'userName': us }, { $set: { password: '234' } })
    res.redirect('manage_staff')
})

router.get('/detail_staff', requireAdmin, async(req, res) => {
    const id = req.query.id
    const dbo = await getDB()
    const staff = await dbo.collection("Staff").findOne({ "_id": ObjectId(id) })
    res.render('detailStaff', { base: staff })
})

router.get('/update_staff', requireAdmin, async(req, res) => {
    const id = req.query.id
    const dbo = await getDB()
    const staff = await dbo.collection("Staff").findOne({ "_id": ObjectId(id) })
    res.render('editStaff', { base: staff })
})

router.post('/editStaff', requireAdmin, async(req, res) => {
    const name = req.body.staffName
    const age = req.body.staffAge
    const phone = req.body.staffPhone
    const specialty = req.body.staffSpecialty;
    const address = req.body.staffAddress;

    const updateToStaff = {
        $set: {
            name: name,
            age: age,
            speciality: specialty,
            address: address,
            phone_number: phone
        }
    }

    const filter = { _id: ObjectId(id) }
    const dbo = await getDB()
    await dbo.collection("Staff").updateOne(filter, updateToStaff)

    const staff = await dbo.collection("Staff").findOne({ "_id": ObjectId(id) })
    res.render('detailStaff', { base: staff })


})

//End Staff

router.get('/addUser', (req, res) => {
        res.render('addUser')
    })
    //Submit add User
router.post('/addUser', (req, res) => {
    const name = req.body.txtName
    const role = req.body.Role
    const pass = req.body.txtPassword
    const objectToInsert = {
        userName: name,
        role: role,
        password: pass
    }
    insertObject("Users", objectToInsert)
    res.render('adminIndex')
})

module.exports = router;