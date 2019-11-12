const authenticated = (req,res,next) =>{

    const {token} = req.headers;
    const Users = require('../routers/users-helper');

    if(token){
        Users.findByPassword(token)
        .then(user =>{
            console.log(user);
            if(user.password == token){
                next();
            }else{
                res.status(401).json({message: 'Invalid token provided provided.'})
            }
        })
        .catch(error =>{
            res.status(500).json({message: "Unexpected error while validating user token."});
        });
    }else{
        res.status(400).json({message: 'No token was provided.'});
    }

};

module.exports = authenticated;