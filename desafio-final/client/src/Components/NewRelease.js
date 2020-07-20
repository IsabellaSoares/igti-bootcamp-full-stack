import React from 'react';

import ModalComponent from './Modal';

const NewRelease = ({
  modalIsOpen,
  openModal,
  modalType,
  updateTransactions,
  closeModal,
}) => (
  <>
    <div className="col s3">
      <a
        className="waves-effect waves-light btn-small"
        style={{ zIndex: 0 }}
        onClick={() => openModal('create', '')}
      >
        <i className="material-icons left">add</i>
        Novo lançamento
      </a>
    </div>

    {modalIsOpen && (
      <ModalComponent
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        modalType={modalType}
        updateTransactions={updateTransactions}
      />
    )}
  </>
);

export default NewRelease;
