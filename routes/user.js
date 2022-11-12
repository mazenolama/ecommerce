const express = require('express')
const { send, get } = require('express/lib/response')
const router = express.Router()
const valit = require('valit')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// GET ALL USERS
router.get('/users' , async (req , res)=>{
    const users = await User.find();
    res.json(users)
    // let {token} = req.headers
    // let token_decode = jwt.verify(token,'privateKey');
})

// GET SINGLE USER
router.get('/user/:id' , async (req , res)=>{
    const {id} = req.params;
    const user = await User.findById(id)
    if(!user) return res.status(404).send({result:'USER NOT FOUND !!'})
    res.send(user)
})

// DELETE USER
router.delete('/user/:id' , async (req , res)=>{
    const {id} = req.params
    let user = await User.findByIdAndDelete(id)
    if(!user) return res.status(404).send({result:'USER NOT FOUND TO DELETE !!'})
    res.send('USER OF ID {'+id+'} HAS BEEN DELETED ')
})

module.exports = router