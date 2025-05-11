const Match = require('../models/Match');
const Blog = require('../models/Blog');
const { advanceWinners } = require('../utils/bracketUtils');

const vote = async (req, res) => {
  const { matchId, voteFor } = req.body;
  const userId = req.user.id;

  try {
    const match = await Match.findById(matchId);
    const alreadyVoted = match.votes.find(v => v.voter.toString() === userId);
    if (alreadyVoted) return res.status(400).json({ message: 'You have already voted.' });

    match.votes.push({ voter: userId, voteFor });

    const voteCounts = match.votes.reduce((acc, curr) => {
      if (curr.voteFor === 1) acc[1]++;
      else if (curr.voteFor === 2) acc[2]++;
      return acc;
    }, { 1: 0, 2: 0 });

    const totalVotes = voteCounts[1] + voteCounts[2];
    const threshold = 5;

    if (totalVotes >= threshold) {
      const winnerId = voteCounts[1] > voteCounts[2] ? match.blog1 : match.blog2;
      match.winner = winnerId;
      await advanceWinners();
    }

    await match.save();
    res.status(200).json({ message: 'Vote has been recorded.', match });
  } catch (err) {
    res.status(500).json({ message: 'Vote failed', error: err.message });
  }
};

const getMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate('blog1').populate('blog2');
    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ message: 'Matches could not be retrieved.', error: err.message });
  }
};

module.exports = { vote, getMatches };
