const translatePeriods = (period) => {
  const monthNames = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  const period_array = period.split('-');
  return `${monthNames[Number(period_array[1]) - 1]} / ${period_array[0]}`;
};

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const calculateTransactionsValues = (transactions) => {
  let revenue = 0;
  let expense = 0;
  let balance = 0;

  transactions.map((transaction) => {
    if (transaction.type === '-') {
      expense += transaction.value;
    } else {
      revenue += transaction.value;
    }
  });

  balance = revenue - expense;

  return { revenue, expense, balance };
};

const convertDate = (str) => {
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
};

export {
  translatePeriods,
  formatter,
  calculateTransactionsValues,
  convertDate,
};
