import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams} from "react-router-dom";
import {getReviews, createReview, editReview, deleteReview} from "../../store/reviews"
import {getUsers} from "../../store/users"
import {addCartItem, setItemQuantity } from "../../store/cart";

import ReactStars from 'react-stars'
import moment from "moment";
import "./single_product.css"
import EditReviewFormModal from "../Modals/EditReviewFormModal";

const SingleProductDisplay = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [rating, setRating] =useState()
    const [description, setDescription] = useState("")
    const [showAdded, setShowAdded] = useState(false)

    const [errorDescription, setErrorDescription] = useState([])
    const [errorRating, setErrorRating] = useState([])



    const productId = useParams().productId
    const product = (useSelector((state)=> state.currProduct))
    const user = useSelector((state)=>state.session.user)
    const users = (useSelector((state)=>state.users))
    const cart = (useSelector((state)=>state.cart))
    console.log(user.id)
    console.log(product.user_id)
    useEffect(()=>{
        dispatch(getReviews(productId)).then(()=>dispatch(getUsers())).then(()=> setIsLoaded(true))
    }, [dispatch, productId])

    const addNewReview = async(e) => {
        e.preventDefault()

        const errorDescriptionValidation =[]
        const errorRatingValidation = []
        if(!description.length){
            errorDescriptionValidation.push("Review description cannot be empty")
        }
        if(!description.length>255){
            errorDescriptionValidation.push("Review description cannot be more than 255 characters")
        }
        if(!rating){
            errorRatingValidation.push("Please select a start rating")

        }

        if (errorDescriptionValidation.length || errorRatingValidation) {
            setErrorDescription(errorDescriptionValidation)
            setErrorRating(errorRatingValidation)
            return
        }

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
        reviews.forEach((review)=>{
            totalRating+=review.rating
        })
        console.log(totalRating)
        return Math.round(totalRating/length*2)/2
    }

    const addToCart = () => {
        const currCartProduct = Object.values(cart.products)
        let inCart = false
        let cartQuantity = 0
        for (let i = 0; i < currCartProduct.length; i++ ){
            console.log(currCartProduct[i].product_id)
            if (currCartProduct[i].product_id === product.id){
                inCart = true
                cartQuantity=Object.values(Object.values(cart)[2])[i]
            }
        }
        console.log("its in the cart", inCart)
        const cartUserId = user.id
        console.log(cartUserId)
        const quantity = cartQuantity
        console.log(quantity)
        const myProduct = {product_id:product.id}
        if (inCart) {
            console.log("its in the cart")
            // setShowAdded(true)
            dispatch(setItemQuantity(myProduct, quantity+1,cartUserId))
            // setShowAdded(false)
            // setTimeout(()=>setShowAdded(false),2000)

        } else {
            console.log("not in cart already will add")
            dispatch(addCartItem(product, cartUserId))

            // setTimeout(()=>setShowAdded(false),2000)
        }
    }

    return(
        isLoaded && (
            <div>
                <div className="product__detail__container">
                    <div className="product__detail__image">
                        <img className="single__product__image" src={product.product_image_url} alt=""></img>
                    </div>
                    <div className="product__detail__info">
                        <div>{users[product?.user_id]?.username}'s Shop</div>
                        <span className="stars" style={{ "--ratingValue": `${avgRating()}` }}></span>
                        <span>{Object.values(product.reviews).length} Reviews</span>
                        <div>{avgRating()} stars</div>
                        <div className="single__product__title"> {product.product_name} </div>
                        <div className="single__product__price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
                        <div className="single__product__description">{product.description}</div>
                        <div className="add__cart__container">
                            {user === null ? <></>:
                                <button className="add__cart__button" onClick={() => addToCart()}>ADD TO CART</button>
                            }
                            {showAdded ?
                                <div className="added__cart__message">added to cart</div>:
                                <></>
                            }
                        </div>
                    </div>
                </div>
                <div className="review__form__container">
                    <div>
                        {user === null || user.id === product.user_id ? <></>:
                            <>
                                <div>Post Form for Review</div>
                                <form onSubmit={addNewReview}>
                                    {errorDescription ? <div>{errorDescription}</div> : <></>}
                                    {errorRating ? <div>{errorRating}</div> : <></>}
                                    <ReactStars value={rating} count={5} onChange={ratingChanged} size={24} color2={"#e0730d"} color1={'#abb1d8'} half={false} />
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="enter description" rows="5" cols="50" />
                                    <button type="submit">Submit</button>
                                </form>
                            </>
                        }
                    </div>
                </div>
                <div className="main__reviews__container">
                    <div className="product__review__container">
                    {Object.values(product.reviews).reverse().map((review)=>{
                        return (
                            <div key={review.id} className="product__review__card">
                                <div>
                                    <div>{users[review?.user_id]?.username} - {formatDate(review?.timestamp)}</div>
                                </div>
                                <span className="stars" style={{ "--ratingValue": `${review.rating}` }}></span>
                                <div>Description: {review.description}</div>
                                {review?.user_id===user?.id ? (
                                    <div>
                                    <button onClick={() => eraseReview(review)}>delete</button>
                                    <EditReviewFormModal review={review} />
                                    </div>
                                ): (<></>)}
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        )
    )
}

export default SingleProductDisplay
