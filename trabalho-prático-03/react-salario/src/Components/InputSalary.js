import React from 'react';
import 'materialize-css';

const InputSalary = ({ handleSalaryChange, salary }) => {
  return (
    <div className="input-field col s12">
      <input
        id="salary"
        type="number"
        value={salary}
        onChange={(event) => handleSalaryChange(event)}
      />
      <label htmlFor="salary">Salário Bruto</label>
    </div>
  );
};

export default InputSalary;
