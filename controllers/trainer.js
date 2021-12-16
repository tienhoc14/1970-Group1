const express = require('express')
const { insertObject, getDB, ObjectId } = require('../databaseHandler')
const { requireTrainer } = require('../projectLibrary')
const router = express.Router()

router.get('/', requireTrainer, (req, res) => {
    res.render('trainerIndex')
})

router.get('/detailCourse', requireTrainer, (req, res) => {
    const user = req.session["User"]
    res.render('detailCourse', { userInfo: user })
})

router.get('/scoring', requireTrainer, (req, res) => {
    const user = req.session["User"]
    res.render('scoring', { userInfo: user })
})

router.post('scoring', requireTrainer, (req,res)=>{
    
})

router.get('/profileTrainer', requireTrainer, async(req, res) => {
    const user = req.session["Trainer"]
    const dbo = await getDB()
    const trainer = await dbo.collection("Trainers").findOne({ "userName": user.name })

    res.render('profileTrainer', { data: trainer })
})


router.get('/updateProfileTrainer', requireTrainer, async(req, res) => {
    const user = req.session["Trainer"]
    const dbo = await getDB()
    const trainer = await dbo.collection("Trainers").findOne({ "userName": user.name })
    res.render('updateProfileTrainer', { data: trainer })
})

router.post('/updateProfileTrainer', requireTrainer, async(req, res) => {
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
    res.render('profileTrainer', { data: trainer })
})

module.exports = router;