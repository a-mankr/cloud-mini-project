const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "votes",
  new Schema({
    team: {
      type: String
    },
    votedFor: {
      type: Number
    },
    identifier: {
      type: String,
      default: "correct"
    }
  })
);
