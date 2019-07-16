const router = require('express').Router();
const Tours = require('./../../data/helpers/toursDbHelper.js');
const restricted = require('../../auth/restrictedMiddleware.js');
const authorization = require('../../auth/tourGuideMiddleware.js');

router.get('/', async(req, res) => {
    try {
        const tours = await Tours.get();
        if (tours) {
            res
                .status(200)
                .json(tours);
        } else {
            res
                .status(404)
                .json('No tours available.');
        }
    } catch (err) {
        res
            .status(500)
            .json(err);
    };
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tours.findById(id);
        if (tour) {
            res
                .status(200)
                .json(tour);
        } else {
            res
                .status(404)
                .json('The tour could not be found');
        }
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

router.post('/', restricted, authorization, async(req, res) => {
    const newTour = req.body;
    try {
        const tour = await Tours.add(newTour);

        if (tour) {
            res
                .status(201)
                .json(tour);
        } else {
            res
                .status(401)
                .json('All fields are required.');
        }
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

router.put('/:id', restricted, authorization, async(req, res) => {
    const id = req.params.id;

    const updatedTour = req.body;

    try {
        const tour = await Tours.updateTour(id, updatedTour);
        console.log(tour);
        if (tour) {
            res
                .status(200)
                .json({tour, message: 'Tour was successfully updated.'});
        } else {
            res
                .status(404)
                .json("The tour with the specified ID does not exist.");
        }
    } catch (err) {
        res
            .status(500)
            .json(err);
    };

});

router.delete('/:id', restricted, authorization, async(req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tours.remove(id);

        if (tour) {
            res
                .status(200)
                .json('Tour was removed');
        } else {
            res
                .status(404)
                .json('The tour could not be found');
        }
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

module.exports = router;