import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditReviewForm from '../../Forms/EditReviewForm.js';

function EditReviewFormModal({review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}><i className="fa-solid fa-pen-to-square"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm setShowModal={setShowModal} review={review}/>
        </Modal>
      )}
    </>
  );
}

export default EditReviewFormModal;
