import React, { useState } from 'react';
import 'materialize-css';

import { calculateSalaryFrom } from './salary.js';

const App = () => {
  const [values, setValues] = useState({
    salary: '',
    baseINSS: '',
    baseIRPF: '',
    discountINSS: '',
    discountIRPF: '',
    netSalary: '',
  });

  const handleSalaryChange = (event) => {
    const results = calculateSalaryFrom(event.target.value);
    setValues({ salary: event.target.value, ...results });
  };

  return (
    <div className="row">
      <form className="col s8 offset-s2">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="standard-full-width"
              type="number"
              value={values.salary}
              onChange={handleSalaryChange}
            />
            <label for="disabled">Salário Bruto</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s3">
            <input id="baseINSS" disabled value={values.baseINSS} />
            <label for="baseINSS">Base INSS</label>
          </div>
          <div className="input-field col s3">
            <input id="discountINSS" disabled value={values.discountINSS} />
            <label for="discountINSS">Desconto INSS</label>
          </div>
          <div className="input-field col s3">
            <input id="baseIRPF" disabled value={values.baseIRPF} />
            <label for="baseIRPF">Base IRPF</label>
          </div>
          <div className="input-field col s3">
            <input id="discountIRPF" disabled value={values.discountIRPF} />
            <label for="discountIRPF">Desconto IRPF</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s3">
            <input id="netSalary" disabled value={values.netSalary} />
            <label for="netSalary">Salário Líquido</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;
