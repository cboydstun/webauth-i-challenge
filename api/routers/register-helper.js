const db = require('../data/dbconf');

    const findUser = (username) =>{
        return db('users')
        .select('*')
        .where('username', username)
    };

    const addUser = (user) =>{
        const {username, password} = user;
        return findUser(username).then(response =>{
            if(response.length > 0)
            {
                return 400;
            }else{
                return db('users').insert(user, '*');
            }
        });
    };

module.exports = {
    addUser,
    findUser,
};