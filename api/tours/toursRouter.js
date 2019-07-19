const router = require('express').Router();
const Tours = require('./../../data/helpers/toursDbHelper.js');
const restricted = require('../../auth/restrictedMiddleware.js');
const authorization = require('../../auth/tourGuideMiddleware.js');

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
                .json({message: 'The tour could not be found'});
        }
    } catch (err) {
        res
            .status(500)
            .json({
                message: 'Error retrieving the tour',
              });
    }
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

router.put('/:id', restricted, authorization, validateAbility, async(req, res) => {
    const id = req.params.id;
    
    const updatedTour = req.body;

    if (Object.keys(updatedTour).length === 0){
        res.status(400).json({message: "missing data"});
      }

    try {
        const tour = await Tours.updateTour(id, updatedTour);
        if (tour) {
            res
                .status(200)
                .json({tour, message: 'Tour was successfully updated.'});
        } else {
            res
                .status(404)
                .json({message: "The tour with the specified ID does not exist."});
        }
    } catch (err) {
        res
            .status(500)
            .json({message: "The tour information could not be modified."});
    };

});

router.delete('/:id', restricted, authorization, validateAbility, async(req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tours.remove(id);    

        if (tour) {
            res
                .status(200)
                .json({ message: 'Tour was removed'});
        } else {
            res
                .status(404)
                .json({message: 'The tour could not be found'});
        }
    } catch (err) {
        res
            .status(500)
            .json({
                message: 'Error removing the tour',
              });
    }
});

// prevents a guide from updating/deleting a tour they dont own
async function validateAbility(req, res, next) {    
    try {
      const tour = await Tours.findById(req.params.id);
    
      if (tour.user_id === req.userId) {
        next()
      } else {
        res.status(403).json({ message: 'this is not your tour' });
      }    
      } catch (err) {
        res.status(500).json({ message: 'failed to process request' });    
      }
  };

module.exports = router;