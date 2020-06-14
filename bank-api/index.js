const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (request, response) => response.status(200).send('Hello world!'));

app.post('/account', (request, response) => {
  let body = request.body;
  let data = JSON.parse(fs.readFileSync('./json/accounts.json', 'utf8'));

  data.accounts.push({ id: data.nextId, ...body });
  data.nextId++;

  try {
    fs.writeFileSync(
      './json/accounts.json',
      JSON.stringify(data, null, 2),
      (err) => response.status(500).send('Internal server error.')
    );

    response.status(200).send('Success!');
  } catch (err) {
    response.status(500).send('Internal server error.');
  }
});

app.listen(3000, () => {
  let exists = fs.existsSync('./json/accounts.json');

  if (!exists) {
    let initialJson = {
      nextId: 1,
      accounts: [],
    };

    fs.writeFileSync(
      './json/accounts.json',
      JSON.stringify(initialJson, null, 2)
    );
  }
});
