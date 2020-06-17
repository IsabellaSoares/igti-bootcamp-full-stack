import React from 'react';
import 'materialize-css';

import Bar from './Bar';

import { percentage } from '../utils/formatters';

const ProgressBarSalary = ({
  salary,
  discountINSS,
  discountIRPF,
  netSalary,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '65%',
        margin: 'auto',
      }}
    >
      <Bar value={percentage(salary, discountINSS)} color="#e67e22" />
      <Bar value={percentage(salary, discountIRPF)} color="#c0392b" />
      <Bar value={percentage(salary, netSalary)} color="#16a085" />
    </div>
  );
};

export default ProgressBarSalary;
