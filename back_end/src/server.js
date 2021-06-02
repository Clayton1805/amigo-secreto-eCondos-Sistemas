require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./databases/connectionMongo');

const app = express();

const {
  LoginController,
  RegisterController,
  RaffleController,
} = require('./controllers');

const { SERVER_ERROR } = require('./utils/allStatusCode');

const PORT = process.env.PORT || 3001;

app.use(cors());
// {
//   origin: 'https://localhost:3000', // url aceita pelo cors
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos aceitos pela url
// }

app.use((req, _res, next) => {
  console.log({
    data: new Date(),
    method: req.method,
    router: req.originalUrl,
  });
  next();
});

app.use(express.json());

app.use('/login', LoginController);

app.use('/register', RegisterController);

app.use('/raffle', RaffleController);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error({ err: err.message });
  res.status(SERVER_ERROR).json({ err: 'erro interno' });
});

app.listen(PORT, () => console.log('running port', PORT));
