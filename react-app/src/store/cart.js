import rfdc from "rfdc";
const clone = rfdc()
const LOAD_CART = "api/cart/LOAD_CART"
const EDIT_CART_ITEM = "api/cart/EDIT_CART_ITEM"
const ADD_CART_ITEM = 'api/cart/ADD_CART_ITEM'
const REMOVE_CART_ITEM = 'api/cart/REMOVE_CART_ITEM'
const EMPTY_CART = 'api/cart/EMPTY_CART'

const loadCart = (cart) => {
    return {
        type: LOAD_CART,
        cart
    }
}
const addCart = (product) =>{
    return {
        type: ADD_CART_ITEM,
        product,
    }
}

const editQuantity = (product) => {
    if (product.quantity < 1) return removeCartItem(product);
    return {
        type: EDIT_CART_ITEM,
        product
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

export const getCart = (data) => async (dispatch) => {
    const data = 1
    const response = await fetch(`/api/carts/${data}`)

    if (response.ok) {
        const cart = await response.json()
        console.log(cart)
        dispatch(loadCart(cart))
    }
}


export const addCartItem = (data) => async (dispatch) => {
    console.log(data)
    const response = await fetch(`/api/carts/`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data })
    })

    if (response.ok) {
        const cart_item = await response.json()
        console.log(cart_item)
        dispatch(addCart(cart_item))
    }
}

export const setItemQuantity = (product, quantity, cartUserId) => async (dispatch) => {
    console.log(product,quantity)
    const productId = product.product_id
    const data = {product,quantity, cartUserId}
    console.log(data)
    const response = await fetch(`/api/carts/${productId}`,{
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data })
    })
    if (response.ok){
        console.log(response)
        const cart_item = await response.json()
        dispatch(editQuantity(cart_item))

    }
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
        case LOAD_CART:
            console.log(action.cart)
            action.cart.cart_items.forEach((product)=>{
                newState.products[product.id] = product
                newState.count[product.id] = product.quantity
                newState.cartTotal[product.id] = newState.count[product.id]*product.product.price
            })
            return newState
        case ADD_CART_ITEM:
            console.log(action.product)
            newState.products[action.product.id] = action.product
            newState.count[action.product.id] = 1
            newState.cartTotal[action.product.id] = newState.count[action.product.id]*action.product.product.price
            return newState
        case EDIT_CART_ITEM:
            console.log(action.product)
            newState.count[action.product.id] = action.product.quantity
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
