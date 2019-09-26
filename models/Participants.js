const mongoose = require("mongoose");
let bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost:27017/bluffmaster", {
  useNewUrlParser: true
});

const db = mongoose.connection;

var ParticipantsSchema = mongoose.Schema({
  p_id: {
    type: Number
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  isBluff: {
    type: Boolean,
    default: false
  },
  profileimage: {
    type: String
  }
});

let Participants = (module.exports = mongoose.model(
  "Participants",
  ParticipantsSchema
));

module.exports.getParticipantById = (id, callback) => {
  Participants.findById(id, callback);
};

module.exports.getParticipantByUsername = (username, callback) => {
  let query = { username: username };
  Participants.findOne(query, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    callback(null, isMatch);
  });
};

module.exports.createParticipant = (newUser, callback) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
