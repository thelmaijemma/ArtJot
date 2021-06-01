const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Jot = require('../models/jot')


// @desc Login/ Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
    //res.send('Login')
    // this is html

    res.render('login', {
        layout: 'login',
    })
})

// @desc Dashboard getting jots
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    console.log(req.user)
    // lean returns javascript objects vs mongoose documents
    try{
        const jots = await Jot.find( {user: req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            jots
        })
    } catch {
        console.error(err)
        req.render('error/500')
    }
   
})

module.exports = router 
