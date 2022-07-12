// frontend/src/components/LoginFormModal/index.jslogin
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignUpForm from '../../auth/SignUpForm';

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='nav__link' onClick={() => setShowModal(true)}>Sign up</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
