const mongoose = require('mongoose');

const SchemaUser = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isRaffle: { type: Boolean, required: true, default: false },
  secretFriend: { type: String },
});

module.exports = mongoose.model('users', SchemaUser);
