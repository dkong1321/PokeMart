import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditOrderForm from '../../Forms/EditOrderForm.js';

function EditOrderFormModal({order}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="edit__order__button" onClick={() => setShowModal(true)}><i className="fa-solid fa-pen-to-square"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditOrderForm setShowModal={setShowModal} order={order}/>
        </Modal>
      )}
    </>
  );
}

export default EditOrderFormModal;
