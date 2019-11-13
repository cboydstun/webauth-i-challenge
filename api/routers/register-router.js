const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Register = require('./register-helper');

router.post('/', (req,res) =>{
    const credentials = req.body;

    if(credentials.username && credentials.password){
        const hash = bcrypt.hashSync(credentials.password, 10);
        credentials.password = hash;
        Register.addUser(credentials)
        .then(user =>{
            req.session.username = user.username;
            res.status(201).json(user);
        }).catch(error =>{
            console.log(`Registration error: ${error}`);
            res.status(500).json(error);
        });   
    }else{
        res.status(401).json({message: "Please be sure to provide a username and password."});
    }

    
});

module.exports = router;
