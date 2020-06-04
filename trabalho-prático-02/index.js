const fs = require('fs');

let statesArray = [];

function main() {
  createFiles();
  // countCities('MG');
  orderCities(statesArray);
  largestCitiesNumber();
  smallestCitiesNumber();
  largestCitiesNames();
  smallestCitiesNames();
}

const createFiles = () => {
  let fileExists = fs.existsSync('./mocks/Estados.json');

  if (fileExists) {
    const states = JSON.parse(fs.readFileSync('./mocks/Estados.json', 'utf8'));

    fs.mkdirSync('./files', { recursive: true });
    fileExists = fs.existsSync('./mocks/Cidades.json');

    if (fileExists) {
      const cities = JSON.parse(
        fs.readFileSync('./mocks/Cidades.json', 'utf8')
      );

      states.map((state) => {
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

        fs.writeFileSync(
          `./files/${state.Sigla}.json`,
          JSON.stringify(array, null, 2)
        );
      });
    }
  }
};

const readStateFile = (UF) => {
  let fileExists = fs.existsSync(`./files/${UF}.json`);

  if (fileExists) {
    const data = fs.readFileSync(`./files/${UF}.json`);
    const cities = JSON.parse(data);
    return cities;
  }
};

const countCities = (UF) => {
  const cities = readStateFile(UF);
  return cities.length;
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

const findLargestCityName = (cities) => {
  let name = '';

  cities.forEach((city) => {
    if (city.Nome.length > name.length) {
      name = city.Nome;
    } else if (city.Nome.length === name.length) {
      if (city.Nome > name) {
        name = city.Nome;
      }
    }
  });

  return name;
};

const findSmallestCityName = (cities) => {
  let name = '';

  cities.forEach((city) => {
    if (city.Nome.length < name.length || name === '') {
      name = city.Nome;
    } else if (city.Nome.length === name.length) {
      if (city.Nome < name) {
        name = city.Nome;
      }
    }
  });

  return name;
};

const largestCitiesNames = () => {
  let result = [];

  statesArray.forEach((state) => {
    const cities = readStateFile(state.UF);
    result.push(`${findLargestCityName(cities)} - ${state.UF}`);
  });

  console.log('Cidades com maiores nomes >> ', result);
};

const smallestCitiesNames = () => {
  let result = [];

  statesArray.forEach((state) => {
    const cities = readStateFile(state.UF);
    result.push(`${findSmallestCityName(cities)} - ${state.UF}`);
  });

  console.log('Cidades com menores nomes >> ', result);
};

main();
