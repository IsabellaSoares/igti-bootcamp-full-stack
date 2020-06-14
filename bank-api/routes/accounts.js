const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  try {
    let data = JSON.parse(fs.readFileSync(global.filename, 'utf8'));
    logger.info('GET / - Success');
    response.status(200).send({ accounts: data.accounts });
  } catch (err) {
    logger.error(`GET / - ${err.message}`);
    response.status(500).send({ error: err.message });
  }
});

router.get('/:id', (request, response) => {
  let id = request.params.id;

  try {
    let data = JSON.parse(fs.readFileSync(global.filename, 'utf8'));

    let account = data.accounts.find((account) => account.id === Number(id));

    if (!account) {
      logger.error(`GET /account/:id - Account not found`);
      response.status(400).send('Account not found.');
    }

    logger.info(`GET /account/:id - ${JSON.stringify(account)}`);
    response.status(200).send(account);
  } catch (err) {
    logger.error(`GET /account/:id - ${err.message}`);
    response.status(500).send({ error: err.message });
  }
});

router.post('/', (request, response) => {
  let body = request.body;
  let data = {};

  try {
    data = JSON.parse(fs.readFileSync(global.filename, 'utf8'));
    data.accounts.push({ id: data.nextId, ...body });
    data.nextId++;

    fs.writeFileSync(global.filename, JSON.stringify(data, null, 2), (err) => {
      logger.error(`POST /account - ${err.message}`);
      response.status(500).send({ error: err.message });
    });

    logger.info(`POST /account - ${JSON.stringify(body)}`);
    response.status(200).send('Account created!');
  } catch (err) {
    logger.error(`POST /account - ${err.message}`);
    response.status(500).send({ error: err.message });
  }
});

router.post('/transaction', (request, response) => {
  let body = request.body;
  let data = {};

  try {
    data = JSON.parse(fs.readFileSync(global.filename, 'utf8'));

    let index = data.accounts.findIndex(
      (account) => account.id === Number(body.id)
    );

    if (index < 0) {
      logger.error(`POST /account/transaction - Account not found`);
      response.status(400).send(`Account ID: ${body.id} not found.`);
    }

    if (body.value < 0 && data.accounts[index].balance + body.value < 0) {
      logger.error(`POST /account/transaction - Insufficient funds`);
      throw new Error('Insufficient funds.');
    }

    data.accounts[index].balance += body.value;

    fs.writeFileSync(global.filename, JSON.stringify(data, null, 2), (err) => {
      logger.error(`POST /account/transaction - ${err.message}`);
      response.status(500).send({ error: err.message });
    });

    logger.info(`POST /account/transaction - ${JSON.stringify(body)}`);
    response.status(200).send('Transaction completed!');
  } catch (err) {
    logger.error(`POST /account/transaction - ${err.message}`);
    response.status(500).send({ error: err.message });
  }
});

router.delete('/:id', (request, response) => {
  let id = request.params.id;

  try {
    let data = JSON.parse(fs.readFileSync(global.filename, 'utf8'));

    data.accounts = data.accounts.filter(
      (account) => account.id !== Number(id)
    );

    fs.writeFileSync(global.filename, JSON.stringify(data, null, 2), (err) => {
      logger.error(`DELETE /account/:id - ${err.message}`);
      response.status(500).send({ error: err.message });
    });

    logger.info(`DELETE /account/:id - Account ID: ${id} deleted`);
    response.status(200).send('Account deleted!');
  } catch (err) {
    logger.error(`DELETE /account/:id - ${err.message}`);
    response.status(500).send({ error: err.message });
  }
});

router.put('/', (request, response) => {
  let newAccount = request.body;

  try {
    let data = JSON.parse(fs.readFileSync(global.filename, 'utf8'));

    let index = data.accounts.findIndex(
      (account) => account.id === Number(newAccount.id)
    );

    if (index < 0) {
      logger.error(`PUT /account - Account ID: ${newAccount.id} not found`);
      response.status(400).send('Account not found.');
    }

    data.accounts[index] = newAccount;

    fs.writeFileSync(global.filename, JSON.stringify(data, null, 2), (err) => {
      logger.error(`PUT /account - ${err.message}`);
      response.status(500).send({ error: err.message });
    });

    logger.info(`PUT /account - ${JSON.stringify(newAccount)}`);
    response.status(200).send('Account updated!');
  } catch (err) {
    logger.error(`PUT /account - ${err.message}`);
    response.status(500).send({ error: err.message });
  }
});

module.exports = router;
