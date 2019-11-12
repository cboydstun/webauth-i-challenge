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
        .then(status =>{
            console.log(status);
            if(status == 400){
                res.status(400).json({message: "Username is already in use."})
            }else{
                res.status(201).json({message: "Registration sucessful."});
            }
        }).catch(error =>{
            console.log(`Registration error: ${error}`);
            res.status(500).json({message: "There was a problem while adding the user to the database."});
        });   
    }else{
        res.status(401).json({message: "Please be sure to provide a username and password."});
    }
});

module.exports = router;