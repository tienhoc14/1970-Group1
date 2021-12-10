const express = require('express')
const { insertObject } = require('../databaseHandler')
const { requiresLogin } = require('../projectLibrary')
const router = express.Router()

router.get('/',requiresLogin,(req,res)=>{
    const user = req.session["User"]
    res.render('trainerIndex', { userInfo: user })
})

router.get('/addUser',(req,res)=>{
    res.render('addUser')
})
//Submit add User
router.post('/addUser',(req,res)=>{
    const name = req.body.txtName
    const role = req.body.Role
    const pass= req.body.txtPassword
    const objectToInsert = {
        userName: name,
        role:role,
        password: pass
    }
    insertObject("Users",objectToInsert)
    res.render('adminIndex')
})

module.exports = router;