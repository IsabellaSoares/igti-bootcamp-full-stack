const express = require('express');
const fs = require('fs');

const app = express();

let data = {};

const fileExists = fs.existsSync('src/mock/grades.json');

if (fileExists) {
  data = JSON.parse(fs.readFileSync('src/mock/grades.json', 'utf8'));
}

const order = (a, b) => {
  if (a.value > b.value) {
    return -1;
  }
  if (a.value < b.value) {
    return 1;
  }

  return 0;
};

app.use(express.json());

// Crie um endpoint para criar uma grade.
app.post('/create-grade', (request, response) => {
  const { student, subject, type, value } = request.body;

  if (!student || !subject || !type || !value) {
    response.status(400).send('Os dados informados não são válidos.');
  }

  const newGrade = {
    id: data.nextId,
    student,
    subject,
    type,
    value,
    timestamp: new Date(),
  };

  data.grades.push(newGrade);

  data.nextId++;

  if (fileExists) {
    try {
      fs.writeFileSync('src/mock/grades.json', JSON.stringify(data, null, 2));
      response.status(200).send(newGrade);
    } catch (err) {
      response.status(500).send('Não foi possivel gravar no arquivo.');
    }
  }
});

// Crie um endpoint para atualizar uma grade.
app.put('/update-grade/:id', (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;

  const index = data.grades.findIndex((grade) => grade.id === id);

  if (index === -1) {
    response.status(400).send('A grade informada não existe.');
  }

  const newGrade = { ...data.grades[index], ...body };
  data.grades[index] = newGrade;

  if (fileExists) {
    try {
      fs.writeFileSync('src/mock/grades.json', JSON.stringify(data, null, 2));
      response.status(200).send('Grade atualizada com sucesso!');
    } catch (err) {
      response.status(500).send('Não foi possivel gravar no arquivo.');
    }
  }
});

// Crie um endpoint para excluir uma grade.
app.delete('/delete-grade/:id', (request, response) => {
  const id = Number(request.params.id);

  data.grades = data.grades.filter((grade) => grade.id !== id);

  if (fileExists) {
    try {
      fs.writeFileSync('src/mock/grades.json', JSON.stringify(data, null, 2));
      response.status(200).send('Grade excluída com sucesso!');
    } catch (err) {
      response.status(500).send('Não foi possivel gravar no arquivo.');
    }
  }
});

// Crie um endpoint para consultar uma grade em específico.
app.get('/grade/:id', (request, response) => {
  const id = Number(request.params.id);

  const grade = data.grades.find((grade) => grade.id === id);

  if (!grade) {
    response.status(400).send('A grade informada não existe.');
  }

  response.status(200).send(grade);
});

// Crie um endpoint para consultar a nota total de um aluno em uma disciplina.
app.get('/student-total-grade', (request, response) => {
  const { student, subject } = request.body;

  if (!student || !subject) {
    response
      .status(400)
      .send(
        'Os dados informados não são suficientes para realizar a busca. Campos necessários: student e subject'
      );
  }

  const total = data.grades
    .filter((grade) => grade.student === student && grade.subject === subject)
    .map((student) => student.value)
    .reduce((acc, current) => {
      return acc + current;
    }, 0);

  response
    .status(200)
    .send(
      `A soma total das notas do aluno ${student} na disciplina ${subject} é ${total}.`
    );
});

// Crie um endpoint para consultar a média das grades de determinado subject e type.
app.get('/subject-average-grade', (request, response) => {
  const { subject, type } = request.body;

  if (!subject || !type) {
    response
      .status(400)
      .send(
        'Os dados informados não são suficientes para realizar a busca. Campos necessários: subject e type'
      );
  }

  const values = data.grades
    .filter((grade) => grade.subject === subject && grade.type === type)
    .map((subject) => subject.value);

  const total = values.reduce((acc, current) => {
    return acc + current;
  }, 0);

  response
    .status(200)
    .send(
      `A médias das notas na disciplina ${subject} é ${total / values.length}.`
    );
});

// Crie um endpoint para retornar as três melhores grades de acordo com determinado subject e type.
app.get('/best-grades', (request, response) => {
  const { subject, type } = request.body;

  if (!subject || !type) {
    response
      .status(400)
      .send(
        'Os dados informados não são suficientes para realizar a busca. Campos necessários: subject e type'
      );
  }

  const grades = data.grades
    .filter((grade) => grade.subject === subject && grade.type === type)
    .sort(order)
    .slice(0, 3);

  response.status(200).send(grades);
});

app.listen(3000);
