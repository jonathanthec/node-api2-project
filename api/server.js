const express = require('express');
const postRouter = require('../routes/posts');

const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.json({ message: 'server up and running' });
});

module.exports = server;