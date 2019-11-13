const db = require('../data/dbconf');

    const findUser = (username) =>{
        return db('users')
        .select('*')
        .where('username', username)
    };

    const findById = (id) =>{
        return db('users')
        .select('*')
        .where('id', id)
        .first();
    };

    const addUser = (user) =>{
        return db('users')
        .insert(user, '*')
        .then(id =>findById(...id));
    };

module.exports = {
    addUser,
    findById,
    findUser,
};