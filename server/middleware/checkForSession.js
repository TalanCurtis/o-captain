module.exports = function (req, res, next) {
    console.log('check for session ran!')
    console.log(req.session.user)
    if (req.session.user) {
        next();
    } else {
        req.session.user = { username: '' }
        next();
    }
}
