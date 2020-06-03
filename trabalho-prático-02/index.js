const { promisify } = require('util');
const fs = require('fs');
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);
const readFileSync = promisify(fs.readFileSync);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

let statesArray = [];

async function main() {
  await createFiles();
  // await countCities('MG');
  orderCities(statesArray);
  largestCitiesNumber();
  smallestCitiesNumber();
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

          statesArray.push({
            UF: state.Sigla,
            number_of_cities: array.length,
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
    const data = readFileSync(`./files/${UF}.json`);
    const cities = JSON.parse(data);
    return cities.length;
  }
};

const orderCities = (array) => {
  array.sort((a, b) => {
    let comparison = 0;
    if (a.number_of_cities < b.number_of_cities) {
      comparison = 1;
    } else if (a.number_of_cities > b.number_of_cities) {
      comparison = -1;
    }

    return comparison;
  });

  return array;
};

const largestCitiesNumber = () => {
  let result = [];

  for (let i = 0; i < 5; i++) {
    result.push(`${statesArray[i].UF} - ${statesArray[i].number_of_cities}`);
  }

  console.log('Estados com o maior número de cidades >> ', result);
};

const smallestCitiesNumber = () => {
  let result = [];
  let count = statesArray.length - 6;

  while (count < statesArray.length) {
    result.push(
      `${statesArray[count].UF} - ${statesArray[count].number_of_cities}`
    );
    count++;
  }

  console.log('Estados com o menor número de cidades >> ', result);
};

main();
