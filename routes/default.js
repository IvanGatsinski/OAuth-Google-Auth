const router = require('express').Router()

router.get('/logout', (req, res) => {
    req.logOut() // Provided method by Passport js
    res.redirect('/')
})
router.get('/', (req, res) => {
    //console.log('req.user = ', req.user)
    res.render('home.hbs');
});

module.exports = router