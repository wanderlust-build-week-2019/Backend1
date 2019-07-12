exports.up = function (knex) {
    return knex
        .schema
        .createTable('users', users => {
            users.increments();
            users
                .string('username')
                .notNullable()
                .unique();
            users
                .string('password')
                .notNullable();
            users
                .integer('role_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('roles')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
