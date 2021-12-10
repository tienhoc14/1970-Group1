const express = require('express')
const { render } = require('express/lib/response')
const async = require('hbs/lib/async')
const { insertObject, getDB } = require('../databaseHandler')
const router = express.Router()

router.use(express.static('public'))

router.get('/', (req, res) => {
    res.render('adminIndex')
})

router.get('/manage_trainer', async(req, res) => {
    const dbo = await getDB();
    const allTrainers = await dbo.collection('Trainers').find({}).toArray();
    console.log()
    res.render('manageTrainer', { data: allTrainers })
})

router.get('/addTrainer', (req, res) => {
    res.render('addTrainer')
})

router.post('/addTrainer', (req, res) => {
    const name = req.body.trainerName
    const age = req.body.trainerAge
    const email = req.body.email
    const spec = req.body.spec
    const address = req.body.address
    const username = req.body.username
    const role = 'Trainer'
    const defaultpass = '123'

    const objectToUser = {
        userName: username,
        role: role,
        password: defaultpass
    }
    const objectToTrainers = {
        name: name,
        age: age,
        email: email,
        speciality: spec,
        address: address
    }

    insertObject("Users", objectToUser)
    insertObject("Trainers", objectToTrainers)
    res.render('manageTrainer')
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