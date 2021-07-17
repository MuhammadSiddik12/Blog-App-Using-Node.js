const express = require('express')
const router = express.Router()
const { home, register, getUser, getUserbyId, postBlog, getBlog, getBlogById, updateById, deleteById, loginPost, likeById, likes } = require('../controllers/user')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    try {
        const authHeader = req.headers.cookie
        const token = authHeader.split('=')[1]
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, 'siddik', (err, user) => {
            if (err) return res.sendStatus(403)
            res.user = user
            next()
        })
    } catch (err) {
        res.send({message:'unAuthorized'})
    }
}
router.get('/', auth, home)
router.post('/registerUser', register)
router.post('/login', loginPost)
router.get('/getUser', auth, getUser)
router.get('/getUser/:id', auth, getUserbyId)
router.get('/getBlog', auth, getBlog)
router.post('/postBlog', auth, postBlog)
router.get('/getBlog/:id', auth, getBlogById)
router.post('/updateBlog/:id', auth, updateById)
router.post('/deleteBlog/:id', auth, deleteById)
router.post('/likeDislike', auth, likeById)
router.get('/likeDislike', auth, likes)

module.exports = router