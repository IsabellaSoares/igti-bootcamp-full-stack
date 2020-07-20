import React from 'react';
import axios from 'axios';

import ModalComponent from './Modal';

import { formatter } from '../helpers';

const TransactionItem = ({
  transaction,
  setTransactions,
  updateTransactions,
  currentPeriod,
  openModal,
  modalIsOpen,
  closeModal,
  modalType,
  modalId,
}) => {
  const deleteTransaction = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/${id}`)
      .then(() =>
        axios
          .get(`${process.env.REACT_APP_API_URL}/?period=${currentPeriod}`)
          .then((res) => setTransactions(res.data))
      );
  };

  return (
    <>
      <li
        className={`collection-item ${
          transaction.type === '-' ? 'red' : 'teal'
        } lighten-4`}
      >
        <div className="col s12 flex-container">
          <div className="col s1">
            <span className="important-text">{`${('0' + transaction.day).slice(
              -2
            )}`}</span>
          </div>
          <div className="col s7">
            <span className="important-text">{transaction.category}</span>
            <br></br>
            <span>{transaction.description}</span>
          </div>
          <div className="col s1">
            <span>{formatter.format(transaction.value)}</span>
          </div>
          <div className="col s2">
            <a
              href="#!"
              className="secondary-content"
              onClick={() => deleteTransaction(transaction._id)}
            >
              <i className="material-icons icons tiny">delete</i>
            </a>
            <a
              href="#!"
              className="secondary-content"
              onClick={() => openModal('edit', transaction._id)}
            >
              <i className="material-icons icons tiny">create</i>
            </a>
          </div>
        </div>
      </li>

      {modalIsOpen && (
        <ModalComponent
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          modalType={modalType}
          modalId={modalId}
          updateTransactions={updateTransactions}
        />
      )}
    </>
  );
};

export default TransactionItem;
