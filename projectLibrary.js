//custom middleware
function requiresLogin(req, res, next) {
    if (req.session["User"]) {
        return next()
    } else {
        res.redirect('/login')
    }
}

function requireAdmin(req, res, next) {
    if (req.session["Admin"]) {
        return next()
    } else {
        res.redirect('/login')
    }
}

function requireStaff(req, res, next) {
    if (req.session["Staff"]) {
        return next()
    } else {
        res.redirect('/login')
    }
}

function requireTrainer(req, res, next) {
    if (req.session["Trainer"]) {
        return next()
    } else {
        res.redirect('/login')
    }
}

function requireTrainee(req, res, next) {
    if (req.session["Trainee"]) {
        return next()
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    requiresLogin,
    requireAdmin,
    requireStaff,
    requireTrainer,
    requireTrainee
}