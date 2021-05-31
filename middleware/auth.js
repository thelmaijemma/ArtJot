module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()){
            return next()
        } else{ 
            res.redirect('/')
            console.log('failed to authenticate')
        }
    },
    ensureGuest: function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    } 
}