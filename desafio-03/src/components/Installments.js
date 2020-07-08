import React from 'react';

import Installment from './Installment';

const Installments = ({ values }) => {
  let totalIncrement = 0;
  let totalPercentage = 0;
  let value = values.initialValue;
  const increase = values.monthlyInterest > 0;

  const calculateInterest = () => {
    value = Number(value) + Number((value * values.monthlyInterest) / 100);
    totalIncrement = value - values.initialValue;
    totalPercentage = (totalIncrement * 100) / values.initialValue;
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {Array.from({ length: values.period }, (_, index) => {
            calculateInterest();

            return (
              <Installment
                key={index}
                index={index}
                totalIncrement={totalIncrement}
                totalPercentage={totalPercentage}
                value={value}
                increase={increase}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Installments;
