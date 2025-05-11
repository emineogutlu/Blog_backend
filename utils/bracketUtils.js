const Match = require('../models/Match');

const advanceWinners = async () => {
  const lastRound = await Match.find().sort({ round: -1 }).limit(1);
  const round = lastRound[0]?.round || 1;
  const matches = await Match.find({ round });

  const winners = matches.map(m => m.winner).filter(w => w);
  for (let i = 0; i < winners.length; i += 2) {
    if (winners[i + 1]) {
      const newMatch = new Match({
        blog1: winners[i],
        blog2: winners[i + 1],
        round: round + 1
      });
      await newMatch.save();
    }
  }
};

module.exports = { advanceWinners };