exports.up = function(knex) {
    return knex.schema.createTable('users', t =>{
        t.increments();
        t.string('username', 255).unique()
        .notNullable();
        t.string('password', 255).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};