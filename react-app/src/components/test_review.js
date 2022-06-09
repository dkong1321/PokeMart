import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {getReviews} from "../store/reviews"
const Reviews = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const productId = useParams().productId
    const product = (useSelector((state)=> state.currProduct))

    useEffect(()=>{
        dispatch(getReviews(productId)).then(()=> setIsLoaded(true))
    }, [dispatch])

    const addNewReview = async(e) => {
        e.preventDefault()
        // const data = {
        //     rating,
        //     description,
        // }
    }

    return(
        isLoaded && (
            <div>
                <div>Hello from single product page/reviews</div>
                {Object.values(product.reviews).map((review)=>{
                    return (
                        <div key={review.id}>
                            <div>Id: {review.id}</div>
                            <div>User: {review.user_id}</div>
                            <div>Description: {review.description}</div>
                        </div>
                    )
                })}
                <form onSubmit={addNewReview}>

                </form>
            </div>
        )
    )
}

export default Reviews
