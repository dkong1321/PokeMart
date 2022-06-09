import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {getReviews, createReview, editReview, deleteReview} from "../../store/reviews"
import ReactStars from 'react-stars'
import "./single_product.css"

const SingleProductDisplay = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [rating, setRating] =useState(1)
    const [description, setDescription] = useState("")

    const [editRating, setEditRating] =useState(1)
    const [editDescription, setEditDescription] = useState("")

    const productId = useParams().productId
    const product = (useSelector((state)=> state.currProduct))
    const user = useSelector((state)=>state.session.user)

    useEffect(()=>{
        dispatch(getReviews(productId)).then(()=> setIsLoaded(true))
    }, [dispatch])

    const addNewReview = async(e) => {
        e.preventDefault()
        const data = {
            rating,
            description,
            user_id:user.id,
            product_id:productId
        }
        dispatch(createReview(data))
    }

    const ratingChanged = (rating) => {
        setRating(rating)
    }

    const editMyReview = async(e) => {
        e.preventDefault()
        const data = {
            editRating,
            editDescription,
            user_id:user.id,
            product_id:productId,
            review_id:3
        }
        dispatch(editReview(data))
    }

    const eraseReview = async (review) => {
        const review_id = review.id
        dispatch(deleteReview(review_id))
    }

    return(
        isLoaded && (
            <div>
                <div className="single__product__title">{product.product_name}</div>
                <img src={product.product_image_url}></img>
                <div>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
                <div>{product.description}</div>
                {Object.values(product.reviews).map((review)=>{
                    return (
                        <div key={review.id} cla>
                            <div>Id: {review.id}</div>
                            <div>User: {review.user_id}</div>
                            <div>Description: {review.description}</div>
                            <span className="stars" style={{ "--ratingValue": `${review.rating}` }}></span>
                            <button onClick={() => eraseReview(review)}>delete</button>
                        </div>
                    )
                })}
                <div>Post Form for Review</div>
                <form onSubmit={addNewReview}>
                    <ReactStars value={rating} count={5} onChange={ratingChanged} size={24} color2={"#e0730d"} color1={'#abb1d8'} half={false} />
                    <input value={description} onChange={e => setDescription(e.target.value)} placeholder="enter description" />
                    {/* <input type='number' value={rating} onChange={e=>setRating(e.target.value)} min="1" max="5" step="1" /> */}
                    <button type="submit">Submit</button>
                </form>

                <div>Edit Form for Review</div>
                <form onSubmit={editMyReview}>
                    <input value={editDescription} onChange={e => setEditDescription(e.target.value)} placeholder="enter description" />
                    <input type='number' value={editRating} onChange={e=>setEditRating(e.target.value)} min="1" max="5" step="1" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    )
}

export default SingleProductDisplay
