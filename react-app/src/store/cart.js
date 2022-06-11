import { useDispatch } from "react-redux";
import rfdc from "rfdc";
const clone = rfdc()
const EDIT_CART_ITEM = "api/cart/EDIT_CART_ITEM"
const ADD_CART_ITEM = 'api/cart/ADD_CART_ITEM'

const addCart = (product) =>{
    return {
        type: ADD_CART_ITEM,
        product,
    }
}

const editQuantity = (product) => {
    return {
        type: EDIT_CART_ITEM,
        product
    }
}


export const addCartItem = (data) => async (dispatch) => {
    console.log(data)
    // will need to dispatch
    const myCartProduct = data
    myCartProduct.quantity=1
    console.log(myCartProduct)
    dispatch(addCart(myCartProduct))
}

export const setItemQuantity = (data) => async (dispatch) => {
    dispatch(editQuantity(data.product))
}

const initialState = {}

const createReducer = (state = initialState, action) => {
    let newState = clone(state);
    switch (action.type){
        // case LOAD_CART:
        //     newState = action.cartProducts
        //     return newState
        case ADD_CART_ITEM:
            newState[action.product.id] = action.product
            return newState
        case EDIT_CART_ITEM:
            console.log(action.product)
            console.log(newState)
            return newState
        default:
            return newState
    }
}

export default createReducer
