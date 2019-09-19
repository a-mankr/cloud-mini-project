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
    identifier: {
      type: String,
      default: "correct"
    }
  })
);
