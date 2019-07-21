const Tours = require('./../data/helpers/toursDbHelper.js');

const authorization = (req, res, next) => {

    const token = req.decodedJwt;

    if (token.userRole === 1) {
        req.userId = token.userId
        next();
    } else {
        res
            .status(403)
            .json({message: 'This feature is for tour guides only.'})
    };
};

async function validateTourId(req, res, next) {

    try {
    const tour = await Tours.findById(req.params.id);
  
    if (tour) {
      req.tour = tour
      next()
    } else {
      res.status(404).json({ message: 'The tour does not exist' });
    }    
    } catch (err) {
      res.status(500).json({ message: 'failed to process request' });    
    }
  };

// prevents a guide from updating/deleting a tour they dont own
async function validateAbility(req, res, next) {    

    if (req.tour.user_id === req.userId) {
        next()
    } else {
        res.status(403).json({ message: 'this is not your tour' });
    }    
  };

module.exports = {authorization, validateAbility, validateTourId};