import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteReviewForm from '../../Forms/DeleteReviewForm';

function DeleteReviewFormModal({review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="my__product__button" onClick={() => setShowModal(true)}><i className="fa-solid fa-trash-can extra"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReviewForm setShowModal={setShowModal} review={review}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteReviewFormModal;
