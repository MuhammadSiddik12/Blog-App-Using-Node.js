const { user, blog, like } = require('../models/dbModels')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.home = (req, res) => {
    res.send('hello')
}


exports.register = async (req, res) => {
    try {
        const pass = await bcrypt.hash(req.body.password, 10);
        const users = {
            name: req.body.name,
            email: req.body.email,
            password: pass
        }
        const data = await user.insertMany(users)
        console.log(data)
        res.json({ message: "SignUp SuccessFully" })
    }
    catch (err) {
        res.send({ message: "please fill all the field" })
    }
}

exports.getUser = async (req, res) => {
    const data = await user.find()
    res.send(data)
}

exports.getUserbyId = async (req, res) => {
    try {
        const data = await user.findById(req.params.id)
        res.send(data)
    }
    catch (err) {
        res.send({ message: "User not found" })
    }
}

exports.postBlog = async (req, res) => {
    try {
        const blog_data = req.body
        const data = await blog.insertMany(blog_data)
        res.json({ message: "Blog created successfully" })
        console.log(data)
    }
    catch (err) {
        res.send({ message: "please fill all the field" })
    }
}

exports.getBlog = async (req, res) => {
    try {
        const data = await blog.find()
        res.send(data)
    }
    catch (err) {
        res.send({ message: "Blog not found" })
    }
}


exports.getBlogById = async (req, res) => {
    try {
        const data = await blog.findById(req.params.id)
        res.send(data)
    }
    catch (err) {
        res.send({ message: "Blog not found" })
    }
}

exports.updateById = async (req, res) => {
    try {
        const data = await blog.findByIdAndUpdate({ _id: req.params.id }, { $set: { 'title': req.body.title, description: req.body.description, author: req.body.author } })
        res.send({ message: "Updated Successfully" })
    }
    catch (err) {
        res.send({ message: "Blog not found" })
    }
}

exports.deleteById = async (req, res) => {
    try {
        const data = await blog.findByIdAndDelete({ _id: req.params.id })
        res.send({ message: "Deleted Successfully" })
    }
    catch (err) {
        res.send({ message: "Blog not found" })
    }
}

exports.loginPost = async (req, res) => {
    try {
        const data = await user.findOne({ email: req.body.email })
        const cmp = await bcrypt.compare(req.body.password, data.password)
        if (cmp) {
            const token = jwt.sign({ email: user.email, name: user.name }, 'siddik')
            res.cookie('token', token)
            res.send({ message: 'login successfully' })
        } else {
            res.send({ message: "Password is Wrong" })
        }
        console.log(data)
    }
    catch (err) {
        res.send({ message: "User not found" })
    }
}

exports.likeById = async (req, res) => {
    console.log(req.body)
    try {
        const data = await user.findById({ _id: req.body.userId })
        if (data) {
            console.log(data2)
            res.send({ message: "Added Successfully" })
        } else {
            res.send({ message: 'user not found' })
        }
    } catch (err) {
        res.send({ message: "Id not found" })

    }
}

exports.likes = async (req, res) => {
    const liked = await like.find()
    let l = 0
    let d = 0
    for (let x in liked) {
        console.log(x)
        if (liked[x].like == true) {
            l += 1
            console.log('true')
        }
        if (liked[x].dislike == true) {
            console.log('false')
            d += 1
        }
    }
    res.send({ liked: l, disliked: d })
}