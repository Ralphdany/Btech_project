require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router()

router.post('/signup', async (req, res) => {
    const {  name, email, password } = req.body
    const user = await User.findOne({email})
    if (user) {
        res.send({message: "User already exists"})
    }
    try{
        const user = new User({ name, email, password})
        await user.save()
        
        res.send({message: "User successfully signed up!"})
        // const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY)
        // res.send({token})

    }catch(err) {
        return res.status(422).send(err.message)
    }
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(422).send({error: 'Must provide email and/or password'})
    }

    const user = await User.findOne({email})
    if(!user) {
        return res.status(404).send({error: "email not found"})
    }

    try{

        await user.comparePassword(password)
        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY)
        console.log(token, password)
        res.send({token})
    }catch (err) {
        console.log(err,  process.env.SECRET_KEY)
        return res.status(422).send({error: "Invalid password or email"})
        
    }
})

module.exports = router