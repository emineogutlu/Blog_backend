const express = require('express');
const router = express.Router();
const { createMatch, voteMatch, getMatches } = require('../controllers/matchController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createMatch);
router.post('/:matchId/vote', auth, voteMatch);
router.get('/', getMatches);

module.exports = router;

