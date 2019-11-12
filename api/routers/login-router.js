const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Login = require('./login-helper');

router.post('/', (req,res) =>{
    const {username, password} = req.body;

    Login.findUser(username)
    .then(user =>{

        if(user && bcrypt.compareSync(password, user.password)){
            res.status(200).json({message: `Welcome back, ${user.username}!`, token: user.password});
        }else{
            res.status(401).json({message: "Invalid credentials provided."});
        }

    }).catch(error =>{
        console.log(error);
        res.status(500).json({message: "Something went wrong while validating the credentials."});
    });
});