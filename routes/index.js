const express = require('express');
const router = express.Router();

const Validator = require('../lib/validate');

/* GET URL. */
router.get('/:url', function(req, res, next) {

});

/* POST new URL. */
router.post('/:url', function(req, res, next) {

});

function throw_500(err, next) {
    err.status = 500;
    err.message = 'Server Error, Something Went Wrong'
    next(err);
}

module.exports = router;
