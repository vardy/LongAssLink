const express = require('express');
const router = express.Router();

const validate = require('../lib/validate'); // Returns validator class
const validator = new validate(); // Instantiating validator

/* GET URL. */
router.get('/:slug', function(req, res, next) {
    let request_slug = req.params.slug;
});

/* POST new URL. */
router.post('/:url', function(req, res, next) {
    let url = req.params.url;
});

function throw_500(err, next) {
    err.status = 500;
    err.message = 'Server Error, Something Went Wrong'
    next(err);
}

module.exports = router;
