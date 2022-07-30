import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteProductForm from '../../Forms/DeleteProductForm';
import DeleteOrderForm from "../../Forms/DeleteOrderForm";

function DeleteOrderFormModal({product}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="my__product__button" onClick={() => setShowModal(true)}><i className="fa-solid fa-trash-can extra"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteProductForm setShowModal={setShowModal} product={product}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteOrderFormModal;
