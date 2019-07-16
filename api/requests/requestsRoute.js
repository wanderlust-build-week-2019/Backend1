const router = require('express').Router();
const Requests = require('./../../data/helpers/requestsDbHelper.js');
const restricted = require('../../auth/restrictedMiddleware.js');
const authorization = require('../../auth/userMiddleware.js');

router.get('/', async(req, res) => {
    try {
        const requests = await Requests.get();
        if (requests) {
            res
                .status(200)
                .json(requests);
        } else {
            res
                .status(404)
                .json('No requests available.');
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
        const request = await Requests.findById(id);
        if (request) {
            res
                .status(200)
                .json(request);
        } else {
            res
                .status(404)
                .json('The request could not be found');
        }
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

router.post('/', restricted, authorization, async(req, res) => {    
    const newRequest = { ...req.body, user_id: req.userId };

    if (newRequest.is_private === undefined || !newRequest.duration || !newRequest.tour_id) {
        return res.status(400).json({ message: 'Need privacy setting, duration, tour id' });
    }

    try {
        const request = await Requests.add(newRequest);

        res.status(201).json(request);
    } catch (err) {
        res
            .status(500)
            .json({
                message: 'Error adding the request',
              });
    }
});

router.put('/:id', restricted, authorization, async(req, res) => {
    const id = req.params.id;

    const updatedRequest = req.body;

    try {
        const request = await Requests.updateRequest(id, updatedRequest);
        if (request) {
            res
                .status(200)
                .json({request, message: 'Request was successfully updated.'});
        } else {
            res
                .status(404)
                .json("The request with the specified ID does not exist.");
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
        const request = await Requests.remove(id);

        if (request) {
            res
                .status(200)
                .json('Request was removed');
        } else {
            res
                .status(404)
                .json('The request could not be found');
        }
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

module.exports = router;