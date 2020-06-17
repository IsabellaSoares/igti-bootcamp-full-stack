import React, { useState } from 'react';
import 'materialize-css';

import { calculateSalaryFrom } from './utils/salary.js';
import InputSalary from './Components/InputSalary';
import InputReadOnly from './Components/InputReadOnly';
import ProgressBarSalary from './Components/ProgressBarSalary';

const App = () => {
  const [values, setValues] = useState({
    salary: '',
    baseINSS: 0,
    baseIRPF: 0,
    discountINSS: 0,
    discountIRPF: 0,
    netSalary: 0,
  });

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
            <InputSalary
              handleSalaryChange={handleSalaryChange}
              salary={values.salary}
            />
          </div>
          <div className="row">
            <InputReadOnly
              name="Base INSS"
              salary={values.salary}
              value={values.baseINSS}
            />
            <InputReadOnly
              name="Desconto INSS"
              salary={values.salary}
              value={values.discountINSS}
            />
            <InputReadOnly
              name="Base IRPF"
              salary={values.salary}
              value={values.baseIRPF}
            />
            <InputReadOnly
              name="Desconto IRPF"
              salary={values.salary}
              value={values.discountIRPF}
            />
          </div>
          <div className="row">
            <InputReadOnly
              name="Salário Líquido"
              salary={values.salary}
              value={values.netSalary}
            />
          </div>
        </form>
      </div>

      <ProgressBarSalary {...values} />
    </>
  );
};

export default App;
