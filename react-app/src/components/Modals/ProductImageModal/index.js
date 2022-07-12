import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
function ProductImageModal({product}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <div className="nav__link" onClick={() => setShowModal(true)}> + Product</div> */}
      <img className="single__product__image" onClick={() => setShowModal(true)} src={product.product_image_url} alt=""></img>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <img className="single__product__modal" src={product.product_image_url} alt=""></img>
        </Modal>
      )}
    </>
  );
}

export default ProductImageModal;
