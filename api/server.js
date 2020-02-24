const express = require('express');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Backend 🤘🏼💀✨'})
})

module.exports = server;