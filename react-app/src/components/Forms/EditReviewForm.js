import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams} from "react-router-dom";
import {getReviews, editReview} from "../../store/reviews"
import {getUsers} from "../../store/users"

import ReactStars from 'react-stars'

const EditReviewForm = ({setShowModal, review}) => {
    const dispatch = useDispatch()
    const [editRating, setEditRating] =useState(review.rating)
    const [editDescription, setEditDescription] = useState(review.description)

    const [errorDescription, setErrorDescription] = useState([])

    const productId = useParams().productId
    const user = useSelector((state)=>state.session.user)

    useEffect(()=>{
        dispatch(getReviews(productId))
        dispatch(getUsers())
    }, [dispatch, productId])

    const editRatingChanged = (editRating) => {
        setEditRating(editRating)
    }

    const editMyReview = async(e) => {
        e.preventDefault()

        const errorDescriptionValidation =[]
        if(!editDescription.length || editDescription.trim().length===0){
            errorDescriptionValidation.push("Review description cannot be empty")
        }
        if(!editDescription.length>255){
            errorDescriptionValidation.push("Review description cannot be more than 255 characters")
        }

        if (errorDescriptionValidation.length) {
            setErrorDescription(errorDescriptionValidation)
            return
        }

        const data = {
            editRating,
            editDescription,
            user_id:user.id,
            product_id:productId,
            review_id:review.id
        }
        dispatch(editReview(data))
        setShowModal(false)
    }


    return(
            <div>
                <div>Edit Form for Review</div>
                <form onSubmit={editMyReview}>
                    {errorDescription ? <div>{errorDescription}</div> : <></>}
                    <input value={editDescription} onChange={e => setEditDescription(e.target.value)} placeholder="enter description" />
                    <ReactStars value={editRating} count={5} onChange={editRatingChanged} size={24} color2={"#e0730d"} color1={'#abb1d8'} half={false} />
                    <button type="submit">Submit</button>
                </form>
            </div>

    )
}

export default EditReviewForm
