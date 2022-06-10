import { useDispatch } from "react-redux";
import rfdc from "rfdc";
const clone = rfdc()
const LOAD_CART = "api/cart/LOAD_CART"

const loadCart = (cartProducts) => {
    return {
        type: LOAD_CART,
        cartProducts
    }
}

export const getCart = () => async (dispatch) => {
    const newObj ={}
    const keys = (Object.keys(localStorage))
    keys.forEach((key)=>{
        const keyInt = parseInt(key)
        let product = JSON.parse(localStorage.getItem(keyInt))
        newObj[keyInt] = product
    })
    dispatch(loadCart(newObj))
}

const initialState = {}

const createReducer = (state = initialState, action) => {
    let newState = clone(state);
    switch (action.type){
        case LOAD_CART:
            newState = action.cartProducts
            return newState
        default:
            return newState
    }
}

export default createReducer
