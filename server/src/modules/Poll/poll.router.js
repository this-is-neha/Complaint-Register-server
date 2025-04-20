
const express = require('express');
const Pollrouter = express.Router();
const { submitVote, getVotes } = require('./poll.controller');


Pollrouter.post('/vote/:candidateName', submitVote);


Pollrouter.get('/votes', getVotes);

module.exports = Pollrouter;
