const express = require('express');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const blogRouter = require('../routes/blog-router.js');
const authenticate = require('../auth/authenticate-middleware.js');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/blog', authenticate, blogRouter)

// testing the server
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Backend 🤘🏼💀✨'})
})

module.exports = server;