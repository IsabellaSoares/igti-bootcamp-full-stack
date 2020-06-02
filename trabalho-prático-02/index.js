const { promisify } = require('util');
const fs = require('fs');
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);
const appendFile = promisify(fs.appendFile);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

async function main() {
  await createFiles();
  await countCities('MG');
}

const createFiles = async () => {
  let fileExists = await exists('./mocks/Estados.json');

  if (fileExists) {
    const states = JSON.parse(await readFile('./mocks/Estados.json', 'utf8'));

    await mkdir('./files', { recursive: true }).then(async () => {
      fileExists = await exists('./mocks/Cidades.json');

      if (fileExists) {
        const cities = JSON.parse(
          await readFile('./mocks/Cidades.json', 'utf8')
        );

        states.map(async (state) => {
          await writeFile(`./files/${state.Sigla}.json`, '[').then(async () => {
            let string = '';
            cities.map((city) => {
              if (city.Estado === state.ID) {
                string += `${JSON.stringify(city)}`;
                //  await appendFile(
                //   `./files/${state.Sigla}.json`,
                //   `${JSON.stringify(city)},\n`
                // );
              }
            });
            let editedText = string.slice(0, -2);
            editedText += ']';
            // console.log(editedText);
            await appendFile(
              `./files/${state.Sigla}.json`,
              JSON.parse(editedText)
            );
          });
        });
      }
    });
  }
};

const countCities = async (UF) => {
  let fileExists = await exists(`./files/${UF}.json`);

  if (fileExists) {
    console.log(`./files/${UF}.json`);
    const cities = JSON.parse(await readFile(`./files/${UF}.json`, 'utf8'));

    console.log(cities);
  }
};

main();
