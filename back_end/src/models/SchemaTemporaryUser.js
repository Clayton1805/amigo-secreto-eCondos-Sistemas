const mongoose = require('mongoose');

const SchemaTemporaryUser = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // createdAt: {
  //   type: Date, expires: '2m', default: Date.now,
  // },
},
{
  timestamps: { createdAt: true, updatedAt: false },
});

// utilizar o TTL do mongodb para apagar os documentos em 24h

// SchemaTemporaryUser.index({ 'expireAt': 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('temporary_users', SchemaTemporaryUser);
