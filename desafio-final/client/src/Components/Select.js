import React from 'react';

import { translatePeriods } from '../helpers';

const Select = ({ periods, currentPeriod, handlePeriodChange }) => {
  return (
    <div className="row center-align flex-container">
      <div className="input-field col s12 m6 l2 btn-group-select">
        <select
          className="browser-default"
          onChange={(event) => handlePeriodChange(event)}
        >
          {periods.map((period) => (
            <option
              key={period}
              value={period}
              selected={period === currentPeriod}
            >
              {translatePeriods(period)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
