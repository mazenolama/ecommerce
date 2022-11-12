const express = require('express')
const { send, get } = require('express/lib/response')
const router = express.Router()
const valit = require('valit')
const jwt = require('jsonwebtoken')
const { encrypt, decrypt } = require('./crypto')
const User = require('../models/User')

const userSchema = {
    firstName: valit.createField(valit.string,{required: true,max:8, min:3}),
    lastName: valit.createField(valit.string,{required: true,max:8, min:3}),
    username: valit.createField(valit.string,{required: true,max:20, min:5}),
    email: valit.createField(valit.string,{required: true, email: true}),
    password: valit.createField(valit.string, {required: true,match: 'conf_password',}),
    conf_password: valit.createField(valit.string, { required: true }),
    phone: valit.createField(valit.string,{max:11, min:10}),
    otp: valit.createField(valit.string,{max:6,min:6}),
    token: valit.createField(valit.string),
    status: valit.createField(valit.string),
    role: valit.createField(valit.string)
}

// Login
router.get('/login' , async (req , res)=>{
    const {username,email,password} = req.body

    //Check If User Is Existing Based On Username Or Email
    const user = await User.find({$or:[{username},{email}]})
    if(user.length == 0) return res.status(404).send({result:'USER NOT FOUND !!'})

    // Decrypting Passsword To Check
    passwordDecrypted = decrypt(user[0].password[0])
    if(password != passwordDecrypted) return res.status(401).send({result:'Incorrect Password !!'})

    //Generate Session Token
    let id = user[0]._id;
    const token = jwt.sign({_id:id},'privateKey')

    res.header('x-auth-token',token).send({result:"success"})
})

//Sign Up 
router.post('/signup' , async (req , res)=>{
    //Get ALL DATA FROM BODY REQUEST
    let {firstName,lastName,username,email,password,conf_password,phone,role} = req.body;

    //CHECK ON EMAIL IF EXISTING OR NOT IN DATABASE
    const check_email = await User.find({email})
    if(check_email.length != 0) return res.status(401).send({result:'EMAIL IS ALREADY EXIST !!'})
    
    //CHECK ON USERNAME IF EXISTING OR NOT IN DATABASE
    const check_username = await User.find({username})
    if(check_username.length != 0) return res.status(401).send({result:'USERNAME IS ALREADY EXIST !!'})

    //CHECK ON REQUESTED DATA IF VALIDATE OR NOT IN SCHEMA
    const errors = valit.validate(req.body, userSchema)
    if(Object.keys(errors).length > 0 ) return res.status(400).send(errors)

   
    //ENCRYPTING USER PASSWORD TO BE STORED IN DATABASE
    password = encrypt(password)
    //password = decrypt(password)
    
    user = new User({firstName,lastName,username,email,password,phone,role})
    try {
        user = await user.save()
    } catch (error) {
        res.send(error)
    }
    res.send(user)
})



module.exports = router