import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ProductForm from '../../Forms/ProductForm.js';

function AddProductFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}> Post a Product</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProductForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddProductFormModal;
