import React from 'react';
import 'materialize-css';

import { formatter, percentage } from '../utils/formatters';

const InputReadOnly = ({ name, salary, value }) => {
  const discountValue = name.includes('Desconto') || name.includes('Salário');

  return (
    <div className="input-field col s3">
      <input
        id={name}
        type="text"
        disabled
        placeholder={formatter.format(0)}
        value={`${formatter.format(value)} ${
          discountValue ? `(${percentage(salary, value)}%)` : ''
        }`}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

export default InputReadOnly;
