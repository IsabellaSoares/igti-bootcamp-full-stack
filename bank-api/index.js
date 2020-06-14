const fs = require('fs');
const express = require('express');

const FILENAME = './json/accounts.json';

const app = express();

app.use(express.json());

app.get('/', (request, response) => response.status(200).send('Hello world!'));

app.get('/accounts', (request, response) => {
  try {
    let data = JSON.parse(fs.readFileSync(FILENAME, 'utf8'));
    response.status(200).send({ accounts: data.accounts });
  } catch (err) {
    response.status(400).send({ error: err.message });
  }
});

app.post('/account', (request, response) => {
  let body = request.body;
  let data = {};

  try {
    data = JSON.parse(fs.readFileSync(FILENAME, 'utf8'));
    data.accounts.push({ id: data.nextId, ...body });
    data.nextId++;

    fs.writeFileSync(FILENAME, JSON.stringify(data, null, 2), (err) =>
      response.status(400).send({ error: err.message })
    );

    response.status(200).send('Success!');
  } catch (err) {
    response.status(400).send({ error: err.message });
  }
});

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
