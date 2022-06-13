import rfdc from "rfdc";
const clone = rfdc()
const EDIT_CART_ITEM = "api/cart/EDIT_CART_ITEM"
const ADD_CART_ITEM = 'api/cart/ADD_CART_ITEM'
const REMOVE_CART_ITEM = 'api/cart/REMOVE_CART_ITEM'
const EMPTY_CART = 'api/cart/EMPTY_CART'

const addCart = (product) =>{
    return {
        type: ADD_CART_ITEM,
        product,
    }
}

const editQuantity = (product, quantity) => {
    if (quantity<1) return removeCartItem(product);
    return {
        type: EDIT_CART_ITEM,
        product,
        quantity
    }
}

const removeCartItem = (product) => {
    return {
        type: REMOVE_CART_ITEM,
        product
    }

}

const emptyCart = () => {
    return {
        type: EMPTY_CART,
    }
}


export const addCartItem = (data) => async (dispatch) => {
    const myCartProduct = data
    dispatch(addCart(myCartProduct))
}

export const setItemQuantity = (product, quantity) => async (dispatch) => {
    dispatch(editQuantity(product, quantity))
}

export const deleteCartItem = (product) => async (dispatch) => {
    dispatch(removeCartItem(product))
}

export const clearCart = () => async(dispatch) => {
    dispatch(emptyCart())
}

const initialState = {cartTotal:{}, products:{}, count:{}}

const createReducer = (state = initialState, action) => {
    let newState = clone(state);
    switch (action.type){
        case ADD_CART_ITEM:
            newState.products[action.product.id] = action.product
            newState.count[action.product.id] = 1
            newState.cartTotal[action.product.id] = newState.count[action.product.id]*action.product.price
            return newState
        case EDIT_CART_ITEM:
            newState.count[action.product.id] = action.quantity
            newState.cartTotal[action.product.id] = newState.count[action.product.id]*action.product.price
            return newState
        case REMOVE_CART_ITEM:
            delete newState.products[action.product.id]
            delete newState.count[action.product.id]
            delete newState.cartTotal[action.product.id]
            return newState
        case EMPTY_CART:

            return initialState
        default:
            return newState
    }
}

export default createReducer
