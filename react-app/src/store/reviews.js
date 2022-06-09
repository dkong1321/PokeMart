import rfdc from "rfdc";
const clone = rfdc()

const LOAD_PRODUCT = "api/reviews/LOAD_PRODUCT"
const ADD_REVIEW = "api/reviews/ADD_REVIEW"
const UPDATE_REVIEW = "api/reviews/ADD_REVIEW"
const REMOVE_REVIEW = "api/reviews/DELETE_REVIEW"

const loadProduct = (product) => {
    return {
        type:LOAD_PRODUCT,
        product
    }
}

const addReview = (review) => {
    return {
        type:ADD_REVIEW,
        review
    }
}

const updateReview = (review) => {
    return {
        type:UPDATE_REVIEW,
        review
    }
}

const removeReview = (review) => {
    return {
        type:REMOVE_REVIEW,
        review
    }
}

export const getReviews = (data) => async (dispatch) =>{
    console.log(data)
    const response = await fetch(`/api/products/${data}/`);
    if(response.ok) {
        const product = await response.json()
        dispatch(loadProduct(product))
    }
}

export const createReview = (data) => async (dispatch) => {

    const {rating, description,user_id,product_id} = data
    // const user
    const response = await fetch(`/api/reviews/`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({rating, description, user_id, product_id})
    });

    if (response.ok) {
        const review = await response.json()
        dispatch(addReview(review))
    }
}

export const editReview = (data) => async (dispatch) => {
    const {editRating, editDescription, user_id, product_id} = data
    const rating = editRating
    const description = editDescription

    const response = await fetch(`/api/reviews/${data.review_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({rating, description, user_id, product_id})
    })

    if (response.ok) {
        const review = await response.json()
        dispatch(updateReview(review))
    }
}

export const deleteReview = (data) => async (dispatch) => {
    console.log(data)
    const response = await fetch(`/api/reviews/${data}`,{
        method: "DELETE"
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(removeReview(review))
    }
}
const initialState = {}

const reviewReducer = (state = initialState, action) => {
    let newState = clone(state);
    switch (action.type) {
        case LOAD_PRODUCT:
            const reviews = action.product.reviews
            const newObj ={}
            reviews.forEach((review)=>{
                newObj[review.id] = review
            })
            newState= action.product
            newState.reviews = newObj
            return newState
        case ADD_REVIEW:
            newState.reviews[action.review.id]=action.review
            return newState
        case UPDATE_REVIEW:
            newState.reviews[action.review.id]=action.review
            return new state
        case REMOVE_REVIEW:
            delete newState.reviews[action.review.id]
            return newState
        default:
            return newState
    }
}

export default reviewReducer
