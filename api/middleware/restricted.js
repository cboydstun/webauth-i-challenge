const restricted = (req,res,next) =>{
    if(req.path.includes('/api/restricted')){
        if(req.session && req.session.username){
            next();
        }else{
            res.status(401).json({message: "This is a restricted section and you do not have access."});
        }
    }else{
        next();
    }
};

module.exports = restricted;