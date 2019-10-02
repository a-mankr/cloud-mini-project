const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "variables",
  new Schema({
    bluffTeam: {
      type: String
    },
    currentQuestion: {
      type: Number
    },
    letVotingHappen: {
      type: Boolean,
      default: false
    },
    identifier: {
      type: String,
      default: "correct"
    }
  })
);
