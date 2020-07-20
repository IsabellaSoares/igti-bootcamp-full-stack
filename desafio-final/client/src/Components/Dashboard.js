import React from 'react';

import { formatter } from '../helpers';

const Dashboard = ({ transactions, results }) => {
  return (
    <div className="row center-align flex-container">
      <div className="col s3 important-text important-text">
        <span>Lançamentos: </span>
        <span>{transactions.length}</span>
      </div>
      <div className="col s3 important-text">
        <span>Receitas: </span>
        <span className="green-text">{formatter.format(results.revenue)}</span>
      </div>
      <div className="col s3 important-text">
        <span>Despesas: </span>
        <span className="red-text">{formatter.format(results.expense)}</span>
      </div>
      <div className="col s3 important-text">
        <span>Saldo: </span>
        <span className={`${results.balance >= 0 ? 'green' : 'red'}-text`}>
          {formatter.format(results.balance)}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
