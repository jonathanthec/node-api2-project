const router = require('express').Router();
const db = require('../data/db');

router.get('/', (req, res) => {
    db
        .find()
        .then(posts => {
            res
                .status(200)
                .json({ posts: posts });
        })
        .catch(() => {
            res
                .status(500)
                .json({ errorMessage: 'The posts information could not be retrieved' });
        })
})

module.exports = router;