import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditProductForm from '../../Forms/EditProductForm.js';

function EditProductFormModal({product}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}><i className="fa-solid fa-pen-to-square"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProductForm setShowModal={setShowModal} product={product}/>
        </Modal>
      )}
    </>
  );
}

export default EditProductFormModal;
