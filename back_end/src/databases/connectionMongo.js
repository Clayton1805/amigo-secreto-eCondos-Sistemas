const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost', {
  dbName: process.env.DB_NAME || 'amigo_secreto',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB conectado');
  })
  .catch((err) => {
    console.log(`MongoDB deu merda na connect ${err}`);
  });
