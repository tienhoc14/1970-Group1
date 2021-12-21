const express = require('express')
const session = require('express-session')
const { checkUserRole } = require('./databaseHandler')
const { requiresLogin } = require('./projectLibrary')

const app = express()

app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 900000 }, saveUninitialized: false, resave: false }))

app.get('/', (req, res) => {
    res.render('login')
})

app.post('/login', async(req, res) => {
    const name = req.body.txtName
    const pass = req.body.txtPass
    const role = await checkUserRole(name, pass)
    if (role == -1) {
        res.render('login')
    } else if (role == "Admin") {
        req.session["Admin"] = {
            name: name,
            role: role
        }
        res.redirect('/admin')

    } else if (role == "Staff") {
        req.session["Staff"] = {
            name: name,
            role: role
        }
        res.redirect('/staff')

    } else if (role == "Trainee") {
        req.session["Trainee"] = {
            name: name,
            role: role
        }
        res.redirect('/trainee')
    } else if (role == "Trainer") {
        req.session["Trainer"] = {
            name: name,
            role: role
        }
        res.redirect('/trainer')
    }
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.render('login')
})

const adminController = require('./controllers/admin')
app.use('/admin', adminController)

const staffController = require('./controllers/staff')
app.use('/staff', staffController)

const trainerController = require('./controllers/trainer')
app.use('/trainer', trainerController)

const traineeController = require('./controllers/trainee')
app.use('/trainee', traineeController)

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)