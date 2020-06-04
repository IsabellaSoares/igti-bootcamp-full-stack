const fs = require('fs');

let statesArray = [];

function main() {
  createFiles();
  // countCities('MG');
  orderCities(statesArray);
  largestCitiesNumber();
  smallestCitiesNumber();
  console.log('Cidades com maiores nomes >> ', largestCitiesNames());
  console.log('Cidades com menores nomes >> ', smallestCitiesNames());
  console.log(
    'Cidade com maior nome dentre todos os estados >> ',
    findLargestCityName(largestCitiesNames())
  );
  console.log(
    'Cidade com menor nome dentre todos os estados >> ',
    findSmallestCityName(smallestCitiesNames())
  );
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

const orderStates = (array) => {
  array.sort((a, b) => {
    let comparison = 0;
    if (a.UF > b.UF) {
      comparison = 1;
    } else if (a.UF < b.UF) {
      comparison = -1;
    }

    return comparison;
  });

  return array;
};

const largestCitiesNumber = () => {
  let result = [];
  let sum = 0;

  for (let i = 0; i < 5; i++) {
    result.push(`${statesArray[i].UF} - ${statesArray[i].number_of_cities}`);
    sum += statesArray[i].number_of_cities;
  }

  console.log('Estados com o maior número de cidades >> ', result);
  console.log('Soma das cidades (maior) >> ', sum);
};

const smallestCitiesNumber = () => {
  let result = [];
  let count = statesArray.length - 5;
  let sum = 0;

  while (count < statesArray.length) {
    result.push(
      `${statesArray[count].UF} - ${statesArray[count].number_of_cities}`
    );
    sum += statesArray[count].number_of_cities;
    count++;
  }

  console.log('Estados com o menor número de cidades >> ', result);
  console.log('Soma das cidades (menor) >> ', sum);
};

const findLargestCityName = (cities) => {
  let name = '';

  cities.forEach((city) => {
    if (city.length > name.length) {
      name = city;
    } else if (city.length === name.length) {
      if (city < name) {
        name = city;
      }
    }
  });

  return name;
};

const findSmallestCityName = (cities) => {
  let name = '';

  cities.forEach((city) => {
    if (city.length < name.length || name === '') {
      name = city;
    } else if (city.length === name.length) {
      if (city < name) {
        name = city;
      }
    }
  });

  return name;
};

const largestCitiesNames = () => {
  let result = [];

  orderStates(statesArray).forEach((state) => {
    const data = readStateFile(state.UF);
    const cities = data.map((item) => item.Nome);
    result.push(`${findLargestCityName(cities)} - ${state.UF}`);
  });

  return result;
};

const smallestCitiesNames = () => {
  let result = [];

  statesArray.forEach((state) => {
    const data = readStateFile(state.UF);
    const cities = data.map((item) => item.Nome);
    result.push(`${findSmallestCityName(cities)} - ${state.UF}`);
  });

  return result;
};

main();
