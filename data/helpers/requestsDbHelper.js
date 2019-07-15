const db = require('../dbConfig.js');

module.exports = {
    get,
    add,
    updateRequest,
    findBy,
    findById,
    remove
};

function get() {
    return db('requests');
};

async function add(request) {
    return db('requests')
        .insert(request)
        .then(ids => {
            return findById(ids[0]);
        });
};

async function updateRequest(id, changes) {
    return db('requests')
        .where({id})
        .update(changes)
        .then(function() {
            return findById(id)
        });
}

async function findBy(filter) {
    return db('requests').where(filter);
}

function findById(id) {
    return db('requests')
        .where({id})
        .first();
};

async function remove(id) {
    return db('requests').where({ id }).del();
}