

function auth(req, res, next) {
    if (req.session.username && req.session.admin) {
        return next()
    } else {
        res.redirect('/login')
    }
}

module.exports = auth