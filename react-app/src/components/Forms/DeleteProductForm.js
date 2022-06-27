import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../store/product";
// import "./edit__product__form.css"

const DeleteProductForm = ({setShowModal, product}) => {
    const dispatch = useDispatch()

    const eraseProduct = async (product) => {
        const product_id = product.id
        dispatch(deleteProduct(product_id))
        setShowModal(false)

    }

    return(
        <div>
            <button onClick={()=>eraseProduct(product)}>Delete Me</button>
        </div>
    )
}

export default DeleteProductForm
