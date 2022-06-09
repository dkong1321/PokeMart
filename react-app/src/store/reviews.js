import rfdc from "rfdc";
const clone = rfdc()

const LOAD_PRODUCT = "api/reviews/LOAD_PRODUCT"
const ADD_PRODUCT = "api/reviews/ADD_PRODUCT"
const loadProduct = (product) => {
    return {
        type:LOAD_PRODUCT,
        product
    }
}

// const

export const getReviews = (data) => async (dispatch) =>{
    console.log(data)
    const response = await fetch(`/api/products/${data}`);
    if(response.ok) {
        const product = await response.json()
        dispatch(loadProduct(product))
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
        default:
            return newState
    }
}

export default reviewReducer
