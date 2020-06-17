import React from 'react';

import Installment from './Installment';

const Installments = ({ values, setValues }) => {
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <div className="row">
          <Installment initialValue={values.initialValue} />
        </div>
      </div>
    </div>
  );
};

export default Installments;
