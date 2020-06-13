const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (request, response) => response.status(200).send('Hello world!'));

app.post('/account', (request, response) => {
  let body = request.body;
  let data = JSON.parse(fs.readFileSync('./json/accounts.json', 'utf8'));

  data.accounts.push(body);

  fs.writeFileSync(
    './json/accounts.json',
    JSON.stringify(data, null, 2),
    (err) => response.status(500).send('Internal server error.')
  );

  response.status(200).send('Success!');
});

app.listen(3000);
