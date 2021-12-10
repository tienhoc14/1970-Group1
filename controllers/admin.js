const express = require('express')
const async = require('hbs/lib/async')
const { insertObject, getDB } = require('../databaseHandler')
const router = express.Router()

router.use(express.static('public'))

router.get('/', (req, res) => {
    res.render('adminIndex')
})

router.get('/manage_trainer', async(req, res) => {
    const dbo = await getDB();
    const allTrainers = await dbo.collection('trainer').find({}).toArray();

    res.render('manageTrainer', { data: allTrainers })
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