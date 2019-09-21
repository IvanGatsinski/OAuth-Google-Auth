exports.setLocals = (req, res, next) => {
    if (req.user) {
        res.locals.isLogged = true
    }
    else {
        res.locals.isLogged = false
    }
    next()
}