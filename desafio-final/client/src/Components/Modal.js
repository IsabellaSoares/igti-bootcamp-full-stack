import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import DatePicker from 'react-datepicker';

import { convertDate } from '../helpers';

import 'react-datepicker/dist/react-datepicker.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalComponent = ({
  closeModal,
  modalIsOpen,
  modalType,
  modalId,
  updateTransactions,
}) => {
  useEffect(() => Modal.setAppElement('body'));

  const [transactionInfos, setTransactionInfos] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (modalType === 'edit') {
      axios
        .put(`${process.env.REACT_APP_API_URL}/${modalId}`, transactionInfos)
        .then(() => {
          updateTransactions();
          closeModal();
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/${modalId}`, {
          description: transactionInfos.description,
          value: transactionInfos.value,
          category: transactionInfos.category,
          year: transactionInfos.date.split('-')[0],
          month: transactionInfos.date.split('-')[1],
          day: transactionInfos.date.split('-')[2],
          yearMonth: `${transactionInfos.date.split('-')[0]}-${
            transactionInfos.date.split('-')[1]
          }`,
          yearMonthDay: transactionInfos.date,
          type: transactionInfos.type,
        })
        .then(() => {
          updateTransactions();
          closeModal();
        });
    }
  };

  useEffect(() => {
    if (modalType === 'edit') {
      axios.get(`${process.env.REACT_APP_API_URL}/${modalId}`).then((res) =>
        setTransactionInfos({
          type: res.data.type,
          description: res.data.description,
          category: res.data.category,
          value: res.data.value,
          date: res.data.yearMonthDay,
        })
      );
    } else {
      setTransactionInfos({
        type: '',
        description: '',
        category: '',
        value: '',
        date: convertDate(new Date()),
      });
    }
  }, [modalId, modalType]);

  return transactionInfos ? (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="row">
        <div className="col s12">
          <div className="row flex-container">
            <div className="col s10">
              <h5>{`${
                modalType === 'edit' ? 'Edição' : 'Criação'
              } de lançamento`}</h5>
            </div>
            <div className="col s2">
              <a
                className="waves-effect waves-light btn-small red"
                onClick={closeModal}
              >
                <i className="material-icons left close-btn-icon">close</i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <form className="col s12" onSubmit={(event) => handleSubmit(event)}>
          <div className="row flex-container">
            <div className="col s6">
              <label>
                <input
                  className="with-gap"
                  name="type"
                  type="radio"
                  checked={transactionInfos.type === '-'}
                  disabled={modalType === 'edit'}
                  onChange={() =>
                    setTransactionInfos({
                      ...transactionInfos,
                      type: '-',
                    })
                  }
                />
                <span>Despesa</span>
              </label>
            </div>
            <div className="col s6">
              <label>
                <input
                  className="with-gap"
                  name="type"
                  type="radio"
                  checked={transactionInfos.type === '+'}
                  disabled={modalType === 'edit'}
                  onChange={() =>
                    setTransactionInfos({
                      ...transactionInfos,
                      type: '+',
                    })
                  }
                />
                <span>Receita</span>
              </label>
            </div>
          </div>

          <div className="row flex-container">
            <div className="col s12">
              <input
                name="description"
                type="text"
                className="validate"
                value={transactionInfos.description}
                onChange={(event) =>
                  setTransactionInfos({
                    ...transactionInfos,
                    description: event.target.value,
                  })
                }
              />
              <label htmlFor="description">Descrição</label>
            </div>
          </div>

          <div className="row flex-container">
            <div className="col s12">
              <input
                name="category"
                type="text"
                className="validate"
                value={transactionInfos.category}
                onChange={(event) =>
                  setTransactionInfos({
                    ...transactionInfos,
                    category: event.target.value,
                  })
                }
              />
              <label htmlFor="category">Categoria</label>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <input
                name="value"
                type="text"
                className="validate"
                value={transactionInfos.value}
                onChange={(event) =>
                  setTransactionInfos({
                    ...transactionInfos,
                    value: event.target.value,
                  })
                }
              />
              <label htmlFor="value">Valor</label>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <DatePicker
                selected={new Date(transactionInfos.date.replace('-', ' '))}
                onChange={(event) =>
                  setTransactionInfos({
                    ...transactionInfos,
                    date: convertDate(event),
                  })
                }
              />
            </div>
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Salvar
          </button>
        </form>
      </div>
    </Modal>
  ) : (
    <></>
  );
};

export default ModalComponent;
