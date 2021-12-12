const express = require('express')
const { render } = require('express/lib/response')
const async = require('hbs/lib/async')
const { insertObject, getDB, DeleteTrainer } = require('../databaseHandler')
const router = express.Router()

router.use(express.static('public'))

router.get('/', (req, res) => {
    res.render('adminIndex')
})

// Trainer 

router.get('/manage_trainer', async(req, res) => {
    const dbo = await getDB();
    const allTrainers = await dbo.collection('Trainers').find({}).toArray();
    res.render('manageTrainer', { data: allTrainers })
})

router.get('/addTrainer', (req, res) => {
    res.render('addTrainer')
})

router.post('/addTrainer', async(req, res) => {
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

router.get('/delete_trainer', async(req, res) => {
    const us = req.query.userName
    await DeleteTrainer(us);
    res.redirect('manage_trainer')
})

router.get('/reset_password', async(req, res) => {
    const us = req.query.userName
    const dbo = await getDB();
    await dbo.collection("Users").updateOne({ 'userName': us }, { $set: { password: '123' } })
    res.redirect('manage_trainer')
})

router.get('/detail_trainer', async(req, res) => {
    res.render('detailTrainer')
})

// End Trainer

//staff cua th nam
router.post('/addStaff', (req, res) => {
    const name = req.body.txtName
    const age = req.body.txtAge
    const email = req.body.txtEmail
    const specialty = req.body.txtSpecialty;
    const address = req.body.txtAddress;

    const newStaff = { name: name, email: email, age: age, specialty: specialty, address: address };
    InsertStaff(newStaff)

})

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