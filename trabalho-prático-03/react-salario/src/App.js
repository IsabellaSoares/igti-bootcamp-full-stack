import React, { useState } from 'react';
import 'materialize-css';

import { calculateSalaryFrom } from './salary.js';
import Bar from './Bar';

const App = () => {
  const [values, setValues] = useState({
    salary: '',
    baseINSS: 0,
    baseIRPF: 0,
    discountINSS: 0,
    discountIRPF: 0,
    netSalary: 0,
  });

  const formatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL',
  });

  const percentage = (value) =>
    values.salary !== '' ? ((value * 100) / values.salary).toFixed(2) : 0;

  const handleSalaryChange = (event) => {
    const results = calculateSalaryFrom(event.target.value);
    setValues({ salary: event.target.value, ...results });
  };

  return (
    <>
      <div className="row">
        <div className="col s8 offset-s2 center">
          <h3>React Salário</h3>
        </div>
      </div>

      <div className="row">
        <form className="col s8 offset-s2">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="salary"
                type="number"
                value={values.salary}
                onChange={handleSalaryChange}
              />
              <label htmlFor="salary">Salário Bruto</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input
                id="baseINSS"
                type="text"
                disabled
                placeholder={formatter.format(0)}
                value={formatter.format(values.baseINSS)}
              />
              <label htmlFor="baseINSS">Base INSS</label>
            </div>
            <div className="input-field col s3">
              <input
                id="discountINSS"
                type="text"
                disabled
                placeholder={formatter.format(0)}
                value={`${formatter.format(values.discountINSS)} (${percentage(
                  values.discountINSS
                )}%)`}
              />
              <label htmlFor="discountINSS">Desconto INSS</label>
            </div>
            <div className="input-field col s3">
              <input
                id="baseIRPF"
                type="text"
                disabled
                placeholder={formatter.format(0)}
                value={formatter.format(values.baseIRPF)}
              />
              <label htmlFor="baseIRPF">Base IRPF</label>
            </div>
            <div className="input-field col s3">
              <input
                id="discountIRPF"
                type="text"
                disabled
                placeholder={formatter.format(0)}
                value={`${formatter.format(values.discountIRPF)} (${percentage(
                  values.discountIRPF
                )}%)`}
              />
              <label htmlFor="discountIRPF">Desconto IRPF</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s3">
              <input
                id="netSalary"
                type="text"
                disabled
                placeholder={formatter.format(0)}
                value={`${formatter.format(values.netSalary)} (${percentage(
                  values.netSalary
                )}%)`}
              />
              <label htmlFor="netSalary">Salário Líquido</label>
            </div>
          </div>
        </form>
      </div>

      <div
        style={{
          display: 'flex',
          width: '65%',
          margin: 'auto',
        }}
      >
        <Bar value={percentage(values.discountINSS)} color="#e67e22" />
        <Bar value={percentage(values.discountIRPF)} color="#c0392b" />
        <Bar value={percentage(values.netSalary)} color="#16a085" />
      </div>
    </>
  );
};

export default App;
