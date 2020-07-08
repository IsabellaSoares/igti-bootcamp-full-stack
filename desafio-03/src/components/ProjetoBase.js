import React, { useState } from 'react';
import Form from './Form';
import Installments from './Installments';

const ProjetoBase = () => {
  const [values, setValues] = useState({
    initialValue: '',
    monthlyInterest: '',
    period: '',
  });

  return (
    <>
      <div className="row">
        <div className="col s8 offset-s2 center">
          <h2>React - Juros Compostos</h2>
        </div>
      </div>

      <Form values={values} setValues={setValues} />
      <Installments values={values} />
    </>
  );
};

export default ProjetoBase;
