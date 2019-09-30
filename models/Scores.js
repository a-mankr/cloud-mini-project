const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "scores",
  new Schema({
    qno: {
      type: Number
    },
    team1: {
      type: Number
    },
    team2: {
      type: Number
    },
    team3: {
      type: Number
    },
    team4: {
      type: Number
    },
    team5: {
      type: Number
    },
    team6: {
      type: Number
    }
  })
);
