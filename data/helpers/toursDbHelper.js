const db = require('../dbConfig.js');

module.exports = {
    get,
    add,
    updateTour,
    findBy,
    findById,
    removeTour
};

function get() {
    return db('tours');
};

async function add(tour) {
    return db('tours')
        .insert(tour)
        .then(ids => {
            return findById(ids[0]);
        });
};

async function updateTour(id, changes) {
    return db('tours')
        .where({id})
        .update(changes)
        .then(function() {
            return findById(id)
        });
}

async function findBy(filter) {
    return db('tours').where(filter);
}

function findById(id) {
    return db('tours')
        .where({id})
        .first();
};

async function removeTour(id) {
    return db('tours').where({ id }).del();
}
