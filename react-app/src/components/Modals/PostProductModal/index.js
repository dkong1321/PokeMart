import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ProductForm from '../../Forms/ProductForm.js';

function AddProductFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='add__product__button' onClick={() => setShowModal(true)}> + Product</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProductForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddProductFormModal;
