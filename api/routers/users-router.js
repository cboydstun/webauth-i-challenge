const express = require('express');
const router = express.Router();

const Users = require('./users-helper');
const authenticated = require('../middleware/authenticated');

router.get('/', authenticated, (req,res) =>{
    Users.find()
    .then(users =>{
        res.status(200).json(users);
    }).catch(error =>{
        console.log(error);
        res.status(500).json({message: "An error occured while attempting to get users."});
    });
});

module.exports = router;