import React from 'react';
import './Installment.css';

import { formatter, formatPercentage } from '../utils/formatters';

const Installment = ({
  index,
  totalIncrement,
  value,
  totalPercentage,
  increase,
}) => {
  return (
    <div className="box">
      <div className="content-box padding-box">
        <div className="col s4">
          <strong>{index + 1}</strong>
        </div>
        <div className="col s8">
          <div
            className={`row content-box ${
              increase ? 'green-text' : 'red-text'
            }`}
          >
            {formatter.format(value)}
          </div>
          <div
            className={`row content-box ${
              increase ? 'green-text' : 'red-text'
            }`}
          >
            {`${increase ? '+' : ''} ${formatter.format(totalIncrement)}`}
          </div>
          <div
            className={`row content-box ${increase ? 'blue-text' : 'red-text'}`}
          >
            {formatPercentage(totalPercentage)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Installment;
