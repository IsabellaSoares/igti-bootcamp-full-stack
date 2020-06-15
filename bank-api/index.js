const fs = require('fs');
const express = require('express');
const accountRouter = require('./routes/accounts.js');
const winston = require('winston');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./doc.js');
const cors = require('cors');

global.filename = './json/accounts.json';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${label}] ${level}: ${message}`
);

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

const app = express();

app.use(express.json());
app.use(cors());
app.use('/account', accountRouter);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(3000, () => {
  try {
    let exists = fs.existsSync(global.filename);

    if (!exists) {
      let initialJson = {
        nextId: 1,
        accounts: [],
      };

      fs.writeFileSync(global.filename, JSON.stringify(initialJson, null, 2));
    }

    logger.info('API started!');
  } catch (err) {
    logger.error(err);
  }
});
