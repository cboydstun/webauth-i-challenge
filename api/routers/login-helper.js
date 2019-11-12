const db = require('../data/dbconf');

const findUser = (username) =>{
    return db('users')
    .select('*')
    .where('username', username)
    .first();
};

module.exports = {
    findUser,
};