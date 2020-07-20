import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { calculateTransactionsValues } from './helpers';

import usePrevious from './CustomHooks/usePrevious';

import Dashboard from './Components/Dashboard';
import Filter from './Components/Filter';
import Header from './Components/Header';

import NewRelease from './Components/NewRelease';
import Select from './Components/Select';
import Transactions from './Components/Transactions';

const App = () => {
  const date = new Date();
  const [currentPeriod, setCurrentPeriod] = useState(
    `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`
  );

  const [periods, setPeriods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [results, setResults] = useState({
    revenue: 0,
    expense: 0,
    balance: 0,
  });
  const [filter, setFilter] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalId, setModalId] = useState('');

  const prevPeriod = usePrevious(currentPeriod);
  const prevTransactions = usePrevious(transactions);

  const handlePeriodChange = (event) => {
    setCurrentPeriod(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const updateTransactions = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/?period=${currentPeriod}`)
      .then((res) => setTransactions(res.data));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/periods`)
      .then((res) => setPeriods(res.data));
  }, []);

  useEffect(() => {
    if (prevPeriod !== currentPeriod || filter === '') {
      updateTransactions();
    }
  }, [currentPeriod, filter]);

  useEffect(() => {
    if (prevTransactions && prevTransactions.length !== transactions.length) {
      setResults(calculateTransactionsValues(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    let results = [];

    if (filter !== '') {
      results = transactions.filter((transaction) =>
        transaction.description
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            filter
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          )
      );
      setTransactions(results);
    }
  }, [filter]);

  const openModal = (type, id) => {
    setModalType(type);
    setModalId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="container row">
      <Header />

      <Select
        periods={periods}
        currentPeriod={currentPeriod}
        handlePeriodChange={handlePeriodChange}
      />

      <Dashboard transactions={transactions} results={results} />

      <div className="row flex-container">
        <NewRelease
          updateTransactions={updateTransactions}
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
          modalType={modalType}
        />
        <Filter handleFilterChange={handleFilterChange} />
      </div>

      <Transactions
        transactions={transactions}
        setTransactions={setTransactions}
        updateTransactions={updateTransactions}
        currentPeriod={currentPeriod}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        modalId={modalId}
        modalType={modalType}
      />
    </div>
  );
};

export default App;
