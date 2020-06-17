import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';

import { calculateSalaryFrom } from './salary.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '22%',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const App = () => {
  const classes = useStyles();
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
    <>
      <Typography variant="h3">React Salário</Typography>
      <div className={classes.root}>
        <div>
          <TextField
            id="standard-full-width"
            label="Salário Bruto"
            placeholder="Salário Bruto"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            type="number"
            value={values.salary}
            onChange={handleSalaryChange}
          />
          <div className={classes.formGroup}>
            <TextField
              id="margin-normal"
              label="Base INSS"
              placeholder="Base INSS"
              className={classes.textField}
              margin="normal"
              disabled
              value={values.baseINSS}
            />
            <TextField
              id="margin-normal"
              label="Desconto INSS"
              placeholder="Desconto INSS"
              className={classes.textField}
              margin="normal"
              disabled
              value={values.discountINSS}
            />
            <TextField
              id="margin-normal"
              label="Base IRPF"
              placeholder="Base IRPF"
              className={classes.textField}
              margin="normal"
              disabled
              value={values.baseIRPF}
            />
            <TextField
              id="margin-normal"
              label="Desconto IRPF"
              placeholder="Desconto IRPF"
              className={classes.textField}
              margin="normal"
              disabled
              value={values.discountIRPF}
            />
          </div>
          <TextField
            id="margin-normal"
            label="Salário Líquido"
            placeholder="Salário Líquido"
            className={classes.textField}
            margin="normal"
            disabled
            value={values.netSalary}
          />
        </div>
      </div>
    </>
  );
};

export default App;
