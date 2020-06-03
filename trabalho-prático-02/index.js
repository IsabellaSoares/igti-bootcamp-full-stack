const { promisify } = require('util');
const fs = require('fs');
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);
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
          let array = [];

          cities.map((city) => {
            if (city.Estado === state.ID) {
              array.push(city);
            }
          });

          writeFile(
            `./files/${state.Sigla}.json`,
            JSON.stringify(array, null, 2)
          );
        });
      }
    });
  }
};

const countCities = async (UF) => {
  let fileExists = await exists(`./files/${UF}.json`);

  if (fileExists) {
    const data = fs.readFileSync(`./files/${UF}.json`);
    const cities = JSON.parse(data);
    console.log(cities);
  }
};

main();
