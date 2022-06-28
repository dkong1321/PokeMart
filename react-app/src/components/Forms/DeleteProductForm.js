import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../store/product";
import "./delete__product__form.css"

const DeleteProductForm = ({setShowModal, product}) => {
    const dispatch = useDispatch()

    const eraseProduct = async (product) => {
        const product_id = product.id
        dispatch(deleteProduct(product_id))
        setShowModal(false)

    }

    const cancelDelete = (e) => {
        setShowModal(false)
    }

    return(
        <div className="delete__confirm__form">
            <h3>Are you sure you want to delete this listing?</h3>
            <div>This process cannot be undone</div>
            <div className="delete__product__button__container">
                <button className="delete__product__button" onClick={()=>eraseProduct(product)}>Delete</button>
                <button className="cancel__button" onClick={(e)=>cancelDelete(e)}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteProductForm
