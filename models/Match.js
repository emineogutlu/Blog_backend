const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  blog1: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  blog2: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  votes: [
    {
      voter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      voteFor: { type: Number, enum: [1, 2] },
    }
  ],
  round: { type: Number, default: 1 },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);

