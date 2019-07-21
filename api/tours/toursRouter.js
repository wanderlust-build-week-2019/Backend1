const router = require('express').Router();
const Tours = require('./../../data/helpers/toursDbHelper.js');
const restricted = require('../../auth/restrictedMiddleware.js');
const {authorization, validateAbility, validateTourId} = require('../../auth/tourGuideMiddleware.js');

router.get('/', async(req, res) => {
    try {
        const tours = await Tours.get();
        res.status(200).json(tours);
    } catch (err) {
        res
            .status(500)
            .json({
                message: 'Error retrieving the tours',
              });
    };
});

router.get('/:id', validateTourId, async(req, res) => {    
    res.status(200).json(req.tour);  
});

router.post('/', restricted, authorization, async(req, res) => {
    
    const newTour = { ...req.body, user_id: req.userId };

    if (!newTour.type || !newTour.location || !newTour.max_duration) {
        return res.status(400).json({ message: 'Need type, location, max duration' });
    }

    try {
        const tour = await Tours.add(newTour);

        res.status(201).json(tour);
    } catch (err) {
        res
            .status(500)
            .json({
                message: 'Error adding the tour',
              });
    }
});

router.put('/:id', restricted, authorization, validateTourId, validateAbility, async(req, res) => {
    const id = req.params.id;
    
    const updatedTour = req.body;

    if (Object.keys(updatedTour).length === 0){
        res.status(400).json({message: "missing data"});
      }

    try {
        const tour = await Tours.updateTour(id, updatedTour);
        res.status(200).json({tour, message: 'Tour was successfully updated.'});
    } catch (err) {
        res
            .status(500)
            .json({message: "The tour information could not be modified."});
    };

});

router.delete('/:id', restricted, authorization, validateTourId, validateAbility, async(req, res) => {
    const id = req.params.id;
    try {
        await Tours.remove(id);    
        
        res.status(200).json({ message: 'Tour was removed'});
    } catch (err) {
        res
            .status(500)
            .json({
                message: 'Error removing the tour',
              });
    }
});

module.exports = router;