const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Jot = require('../models/jot')


// @desc Show all jots
// @route GET /jots/add
router.get('/', ensureAuth, async (req, res) => {
    try{
        const jots = await Jot.find({ status: 'public'})
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean() // to pass into template

            res.render('jots/index', {
                jots,
            })
    } catch {
        console.error(err)
        res.render('error/500')
    }
})

// @desc Show single jot
// @route GET /jots/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let jot = await Jot.findById(req.params.id)
        .populate('user')
        .lean()

        if (!jot){
            return res.render('error/404')
        }
        res.render('jots/show', {
            jot
        })

    } catch (err){
        console.error(err)
        res.render('error/404')
    }
})

// @desc Show add page
// @route GET /jots/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('jots/add')
}) 


// @desc Process add form
// @route POST /stories
router.post('/', ensureAuth, async (req, res) => {
    try{
        req.body.user = req.user.id
        await Jot.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})


// @desc Show edit page
// @route GET /jots/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try{
    const jot = await Jot.findOne({
        _id: req.params.id
    }).lean()
    if (!jot) {
        return res.render('error/404')
    }
    if (jot.user != req.user.id) {
        res.redirect('/jots')
    } else {
        res.render('jots/edit', {
            jot,
        })
    }
} catch (err) {
    console.error(err)
    return res.render('error/500')
}
}) 


// @desc Update jot
// @route PUT /jots/edit
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let jot = await Jot.findById(req.params.id).lean()
        if (!jot) {
            return res.render('error/404')
        }    
    if (jot.user != req.user.id) {
        res.redirect('/jots')
    } else {
        jot = await Jot.findOneAndUpdate({_id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })

        res.redirect('/dashboard')

        }
    }  catch (error) {
        console.error(err)
        return res.render('error/500')
    }

}) 

// @desc Delete Jot
// @route delete /jots/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try{
        await Jot.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (err) {
            console.error(err)
            return res.render('error/500')
    }
}
    )



// @desc User Stories
// @route GET /jots/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try{
        const jots = await Jot.find({
            user: req.params.userId,
            status: 'public'
        })
        .populate('user')
        .lean()

        res.render('jots/index', {
            jots
        })
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
}) 









module.exports = router 
