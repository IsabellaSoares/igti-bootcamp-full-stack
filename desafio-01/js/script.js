let searchInput = null;
let searchBtn = null;

let listTitle = null;
let statisticsTitle = null;

let loader = null;
let content = null;

let filteredList = null;
let statisticsContainer = null;

let users = [];

window.addEventListener('load', async () => {
  searchInput = document.getElementById('search');
  searchBtn = document.querySelector('button');

  listTitle = document.getElementById('filtered-list-title');
  statisticsTitle = document.getElementById('statistics-title');

  loader = document.getElementById('loader');
  content = document.getElementById('content');

  filteredList = document.getElementById('filtered-list');
  statisticsContainer = document.getElementById('statistics-container');

  render();
});

const render = () => {
  addListeners();
  loadUsers();
};

const addListeners = () => {
  searchInput.addEventListener('keyup', (event) => {
    if (event.target.value !== '') {
      searchBtn.disabled = false;
      appendUsers(listTitle, statisticsTitle, users, event.target.value);
      return;
    }

    setEmptyInput();
  });

  searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    appendUsers(listTitle, statisticsTitle, users, searchInput.value);
  });
};

const loadUsers = async () => {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );

  const json = await res.json();

  users = json.results.map((user) => {
    return {
      name: `${user.name.first} ${user.name.last}`,
      picture: user.picture.thumbnail,
      age: user.dob.age,
      gender: user.gender,
    };
  });

  loader.style.display = 'none';
  content.style.display = 'block';
};

const setEmptyInput = () => {
  listTitle.innerText = 'Nenhum usuário filtrado';
  statisticsTitle.innerText = 'Nada a ser exibido';
  document.getElementById('users-list').remove();
  document.getElementById('statistics-data').remove();
  searchBtn.disabled = true;
};

const filterUsers = (users, searchTerm) => {
  let filteredUsers = [];

  if (searchTerm !== '') {
    filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
};

const appendUsers = (listTitle, statisticsTitle, users, searchTerm) => {
  const filteredUsers = filterUsers(users, searchTerm);

  listTitle.innerText = `${filteredUsers.length} usuário(s) encontrado(s)`;

  let usersList = '<div id="users-list">';

  filteredUsers.forEach((user) => {
    const userContainer = `<div class='user-container'>
        <img src='${user.picture}' alt='User picture'/>  
        <span>${user.name}, ${user.age} anos</span>
      </div>`;

    usersList += userContainer;
  });

  usersList += '</div>';
  filteredList.innerHTML = usersList;

  appendStatistics(statisticsTitle, filteredUsers);
};

const appendStatistics = (statisticsTitle, filteredUsers) => {
  statisticsTitle.innerText = 'Estatísticas';

  const statistics = `<div id="statistics-data">
    <p>Sexo Feminino: <strong>${filterFemale(filteredUsers)}</strong></p>
    <p>Sexo Masculino: <strong>${filterMale(filteredUsers)}</strong></p>
    <p>Soma das idades: <strong>${ageSum(filteredUsers)}</strong></p>
    <p>Média das idades: <strong>${ageAverage(filteredUsers)}</strong></p>
  </div>`;

  statisticsContainer.innerHTML = statistics;
};

const filterFemale = (filteredUsers) => {
  const femaleUsers = filteredUsers.filter((user) => user.gender === 'female');
  return femaleUsers.length;
};

const filterMale = (filteredUsers) => {
  const maleUsers = filteredUsers.filter((user) => user.gender === 'male');
  return maleUsers.length;
};

const ageSum = (filteredUsers) => {
  const sum = filteredUsers.reduce((prev, current) => {
    return prev + current.age;
  }, 0);

  return sum;
};

const ageAverage = (filteredUsers) => {
  const average = filteredUsers.reduce((prev, current) => {
    return prev + current.age;
  }, 0);

  return (average / filteredUsers.length).toFixed(2);
};
