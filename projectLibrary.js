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

module.exports = { requiresLogin, requireAdmin }