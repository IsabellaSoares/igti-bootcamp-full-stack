const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const percentage = (initialValue, monthlyInterest) =>
  initialValue !== '' ? ((initialValue * monthlyInterest) / 100).toFixed(2) : 0;

const formatPercentage = (percentage) =>
  percentage !== '' ? `${Number(percentage).toFixed(2)}%` : '';

export { formatter, percentage, formatPercentage };
