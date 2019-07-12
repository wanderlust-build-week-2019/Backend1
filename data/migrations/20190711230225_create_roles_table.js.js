exports.up = function (knex) {
    return knex
        .schema
        .createTable('roles', roles => {
            roles.increments();
            roles
                .string('name', 15)
                .notNullable()
                .unique();
        });
};

exports.down = function (knex) {
    return knex
        .schema
        .dropTableIfExists('roles')
};
