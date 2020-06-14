const fs = require('fs');
const express = require('express');
const router = express.Router();

const FILENAME = './json/accounts.json';

router.get('/', (request, response) => {
  try {
    let data = JSON.parse(fs.readFileSync(FILENAME, 'utf8'));
    response.status(200).send({ accounts: data.accounts });
  } catch (err) {
    response.status(400).send({ error: err.message });
  }
});

router.post('/', (request, response) => {
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

module.exports = router;
