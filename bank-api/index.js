const fs = require('fs');
const express = require('express');
const accountRouter = require('./routes/accounts.js');

const FILENAME = './json/accounts.json';

const app = express();

app.use(express.json());
app.use('/account', accountRouter);

app.listen(3000, () => {
  let exists = fs.existsSync(FILENAME);

  if (!exists) {
    let initialJson = {
      nextId: 1,
      accounts: [],
    };

    fs.writeFileSync(FILENAME, JSON.stringify(initialJson, null, 2));
  }
});
