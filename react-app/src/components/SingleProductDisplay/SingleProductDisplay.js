import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {getReviews, createReview, editReview, deleteReview} from "../../store/reviews"
import {getUsers} from "../../store/users"
import { addCartItem, getCart } from "../../store/cart";

import ReactStars from 'react-stars'
import moment from "moment";
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
    const users = (useSelector((state)=>state.users))
    const cart = (useSelector((state)=>state.cart))


    useEffect(()=>{
        dispatch(getReviews(productId)).then(()=>dispatch(getUsers())).then(()=> setIsLoaded(true))
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

    const editRatingChanged = (editRating) => {
        setEditRating(editRating)
    }

    const editMyReview = async(e) => {
        e.preventDefault()
        const data = {
            editRating,
            editDescription,
            user_id:user.id,
            product_id:productId,
            review_id:5
        }
        dispatch(editReview(data))
    }

    const eraseReview = async (review) => {
        const review_id = review.id
        dispatch(deleteReview(review_id))
    }

    const formatDate = (date) => {
        const newDate = moment(date).format("DD/MM/YY hh:mm a");
        return newDate;
    };


    const avgRating = () => {
        const reviews = Object.values(product.reviews)
        const length = reviews.length
        let totalRating = 0
        console.log(reviews)
        reviews.forEach((review)=>{
            totalRating+=review.rating
        })
        console.log(totalRating)
        return Math.round(totalRating/length*2)/2
    }

    const addToCart = () => {
        dispatch(addCartItem(product))
    }

    return(
        isLoaded && (
            <div>
                <div className="product__detail__container">
                    <div className="product__detail__image">
                        <img className="single__product__image" src={product.product_image_url}></img>
                    </div>
                    <div className="product__detail__info">
                        <div>{users[product.user_id].username}'s Shop</div>
                        {Object.keys(cart).includes(product.id.toString()) ? (
                                <div>In to Cart</div>
                            ): (<button onClick={() => addToCart()}>add local storage</button>)}
                        <span className="stars" style={{ "--ratingValue": `${avgRating()}` }}></span>
                        <div>{Object.values(product.reviews).length} Reviews</div>
                        <div className="single__product__title"> {product.product_name} </div>
                        <div>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
                        <div>{product.description}</div>
                    </div>
                </div>
                <div>Post Form for Review</div>
                <form onSubmit={addNewReview}>
                    <ReactStars value={rating} count={5} onChange={ratingChanged} size={24} color2={"#e0730d"} color1={'#abb1d8'} half={false} />
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="enter description" rows="5" cols="50" />
                    <button type="submit">Submit</button>
                </form>

                <div>Edit Form for Review</div>
                <form onSubmit={editMyReview}>
                    <input value={editDescription} onChange={e => setEditDescription(e.target.value)} placeholder="enter description" />
                    <ReactStars value={editRating} count={5} onChange={editRatingChanged} size={24} color2={"#e0730d"} color1={'#abb1d8'} half={false} />
                    <button type="submit">Submit</button>
                </form>
                <div className="product__review__container">
                {Object.values(product.reviews).reverse().map((review)=>{
                    return (
                        <div key={review.id} className="product__review__card">
                            <div>
                                <div>{users[review.user_id].username} - {formatDate(review.timestamp)}</div>
                            </div>
                            <span className="stars" style={{ "--ratingValue": `${review.rating}` }}></span>
                            <div>Description: {review.description}</div>
                            {review.user_id==user.id ? (
                                <button onClick={() => eraseReview(review)}>delete</button>
                            ): (<></>)}
                        </div>
                    )
                })}
                </div>
            </div>
        )
    )
}

export default SingleProductDisplay
