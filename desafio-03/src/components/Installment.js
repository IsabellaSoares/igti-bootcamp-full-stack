import React from 'react';

import { formatter, percentage } from '../utils/formatters';

const Installment = ({ initialValue }) => {
  return (
    <div className="input-field col s2">
      <div className="row">
        <div className="col s2">1</div>
        <div className="col s10">
          <div className="row">{formatter.format(initialValue)}</div>
          <div className="row">{`+ ${formatter.format(initialValue)}`}</div>
          <div className="row">{initialValue}</div>
        </div>
      </div>
    </div>
  );
};

export default Installment;
