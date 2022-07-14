import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import "./delete__product__form.css"

const DeleteReviewForm = ({setShowModal, review}) => {
    const dispatch = useDispatch()

    const eraseReview = async (review) => {
        const review_id = review.id
        dispatch(deleteReview(review_id))
    }


    const cancelDelete = (e) => {
        setShowModal(false)
    }

    return(
        <div className="delete__confirm__form">
            <h3>Are you sure you want to delete this review?</h3>
            <div>This process cannot be undone</div>
            <div className="delete__product__button__container">
                <button className="delete__product__button" onClick={()=>eraseReview(review)}>Delete</button>
                <button className="cancel__button" onClick={(e)=>cancelDelete(e)}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteReviewForm
