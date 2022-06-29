import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ProductForm from '../../Forms/ProductForm.js';
import "../../Nav__Bar/nav__bar.css"
function AddProductFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="nav__link" onClick={() => setShowModal(true)}> + Product</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProductForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddProductFormModal;
