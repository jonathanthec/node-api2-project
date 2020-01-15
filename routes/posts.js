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

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(post => {
            if(post.length) {
                res
                    .status(200)
                    .json(post)
            }
            else {
                res
                    .status(404)
                    .json({ errorMessage: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(() => {
            res
                .status(500)
                .json({ errorMessage: 'The post information could not be retrieved.' })
        })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    db
        .findById(id)
        .then(post => {
            if(post.length) {
                db
                    .findCommentById(id)
                    .then(comment => {
                        if(comment.length) {
                            res
                                .status(200)
                                .json(comment)
                        }
                        else {
                            res
                                .status(404)
                                .json({ message: "The post with the specified ID does not exist." })
                        }
                    })
                    .catch(() => {
                        res
                            .status(500)
                            .json({ errorMessage: "The comments information could not be retrieved." });
                    })
            }
            else {
                res
                    .status(404)
                    .json({ errorMessage: "The post with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res
                .status(500)
                .json({ errorMessage: "The comments information could not be retrieved." })
        });
})

router.post('/', (req, res) => {
    const post = req.body;

    if(!post.title || !post.contents) {
        res
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." });
    }

    db
        .insert(post)
        .then(({ id }) => {
            db
                .findById(id)
                .then(newPost => {
                    res
                        .status(201)
                        .json(newPost)
                })
                .catch(() => {
                    res
                        .status(404)
                        .json({ errorMessage: "The post with the specified ID does not exist." });
                })
        })
        .catch(() => {
            res
                .status(500)
                .json({ errorMessage: "There was an error while saving the post to the database" });
        });
})



module.exports = router;