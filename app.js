const express = require('express')
const app = express()

app.set('view engine','hbs')

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})

const adminController = require('./admin')
app.use('/admin',adminController)

const staffController = require('./staff')
app.use('/staff',staffController)

const trainerController = require('./trainer')
app.use('/trainer',trainerController)

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)