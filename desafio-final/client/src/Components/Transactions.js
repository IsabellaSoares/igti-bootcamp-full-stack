import React from 'react';

import TransactionItem from './TransactionItem';

const Transactions = ({
  transactions,
  setTransactions,
  currentPeriod,
  openModal,
  modalIsOpen,
  setIsOpen,
  modalId,
  modalType,
  updateTransactions,
  closeModal,
}) => (
  <div className="row">
    <ul className="collection">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction._id}
          transaction={transaction}
          setTransactions={setTransactions}
          updateTransactions={updateTransactions}
          currentPeriod={currentPeriod}
          openModal={openModal}
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          modalType={modalType}
          modalId={modalId}
          closeModal={closeModal}
        />
      ))}
    </ul>
  </div>
);

export default Transactions;
