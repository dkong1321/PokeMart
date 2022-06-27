import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteProductForm from '../../Forms/DeleteProductForm';

function DeleteProductFormModal({product}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}><i className="fa-solid fa-trash-can"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteProductForm setShowModal={setShowModal} product={product}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteProductFormModal;
