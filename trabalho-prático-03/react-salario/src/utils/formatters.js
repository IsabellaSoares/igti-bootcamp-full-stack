const formatter = new Intl.NumberFormat([], {
  style: 'currency',
  currency: 'BRL',
});

const percentage = (salary, value) =>
  salary !== '' ? ((value * 100) / salary).toFixed(2) : 0;

export { formatter, percentage };
