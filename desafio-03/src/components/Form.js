import React from 'react';

const Form = ({ values, setValues }) => {
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="row">
      <form className="col s8 offset-s2">
        <div className="row">
          <div className="input-field col s4">
            <input
              id="initial-value"
              name="initialValue"
              type="number"
              value={values.initialValue}
              onChange={(event) => handleChange(event)}
            />
            <label htmlFor="salary">Montante inicial</label>
          </div>
          <div className="input-field col s4">
            <input
              id="monthly-interest"
              name="monthlyInterest"
              type="number"
              value={values.monthlyInterest}
              onChange={(event) => handleChange(event)}
            />
            <label htmlFor="monthly-interest">Taxa de juros mensal</label>
          </div>
          <div className="input-field col s4">
            <input
              id="period"
              name="period"
              type="number"
              value={values.period}
              onChange={(event) => handleChange(event)}
            />
            <label htmlFor="period">Período (meses)</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
