const router = require('express').Router()
const passport = require('passport')

router.get('/auth/google/redirect', 
  passport.authenticate('google', 
  { 
    successRedirect: '/' ,
    failureRedirect: '/login' 
  }));
router.get('/auth/google',(req, res, next) => {
  if (req.user) {
    return res.redirect('/')
  }
    next()
},
  passport.authenticate('google', { scope: ['profile'], prompt: 'select_account', })
);
module.exports = router