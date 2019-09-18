const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  optionNo: Number,
  option: String
});
const questionSchema = new Schema({
  statement: String,
  correctoptions: [optionSchema],
  incorrectoptions: [optionSchema]
});

module.exports = mongoose.model(
  "questions",
  new Schema({
    qno: {
      type: Number
    },
    question: {
      type: questionSchema
    },
    isDone: {
      type: Boolean,
      default: false
    }
  })
);
