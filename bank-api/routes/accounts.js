const fs = require('fs');
const express = require('express');
const router = express.Router();

const FILENAME = './json/accounts.json';

router.get('/', (request, response) => {
  try {
    let data = JSON.parse(fs.readFileSync(FILENAME, 'utf8'));
    response.status(200).send({ accounts: data.accounts });
  } catch (err) {
    response.status(500).send({ error: err.message });
  }
});

router.get('/:id', (request, response) => {
  let id = request.params.id;

  try {
    let data = JSON.parse(fs.readFileSync(FILENAME, 'utf8'));

    let account = data.accounts.find((account) => account.id === Number(id));

    if (!account) response.status(400).send('Account not found.');

    response.status(200).send(account);
  } catch (err) {
    response.status(500).send({ error: err.message });
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
      response.status(500).send({ error: err.message })
    );

    response.status(200).send('Account created!');
  } catch (err) {
    response.status(500).send({ error: err.message });
  }
});

router.delete('/:id', (request, response) => {
  let id = request.params.id;

  try {
    let data = JSON.parse(fs.readFileSync(FILENAME, 'utf8'));

    data.accounts = data.accounts.filter(
      (account) => account.id !== Number(id)
    );

    fs.writeFileSync(FILENAME, JSON.stringify(data, null, 2), (err) =>
      response.status(500).send({ error: err.message })
    );

    response.status(200).send('Account deleted!');
  } catch (err) {
    response.status(500).send({ error: err.message });
  }
});

router.put('/', (request, response) => {
  let newAccount = request.body;

  try {
    let data = JSON.parse(fs.readFileSync(FILENAME, 'utf8'));

    let index = data.accounts.findIndex(
      (account) => account.id === Number(newAccount.id)
    );

    if (index < 0) response.status(400).send('Account not found.');

    data.accounts[index] = newAccount;

    fs.writeFileSync(FILENAME, JSON.stringify(data, null, 2), (err) =>
      response.status(500).send({ error: err.message })
    );

    response.status(200).send('Account updated!');
  } catch (err) {
    response.status(500).send({ error: err.message });
  }
});

module.exports = router;
