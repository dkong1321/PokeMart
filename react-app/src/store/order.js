import rfdc from "rfdc";

const clone = rfdc()

const LOAD_ORDERS = "api/orders/LOAD_ORDERS"
const ADD_ORDER = "api/orders/ADD_ORDER"
const UPDATE_ORDER = "api/orders/UPDATE_ORDER"
const REMOVE_ORDER = "api/orders/REMOVE_ORDER"

const loadOrder = (orders) => {
    return {
        type: LOAD_ORDERS,
        orders
    }
}

const addOrder = (order) => {
    return {
        type: ADD_ORDER,
        order
    }
}

const updateOrder = (order) => {
    return {
        type: UPDATE_ORDER,
        order
    }
}

const removeOrder = (order) => {
    return {
        type: REMOVE_ORDER,
        order
    }
}

export const getOrders = (data) => async (dispatch) => {
    const response = await fetch(`/api/orders/${data}`)

    if (response.ok) {
        const orders = await response.json()
        dispatch(loadOrder(orders))
    }
}

export const postOrder = (data) => async (dispatch) => {
    console.log(data)

    // formData.append("order_products", data.order_products)
    const response = await fetch(`/api/orders/`, {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data })
    })

    if (response.ok) {
        const order = await response.json()
        console.log(order)
        dispatch(addOrder(order))
    }
}


export const editOrder = (data) => async (dispatch) => {
    const {shipping_address, city, first_name, last_name,state, order_id} = data;
    console.log(data)
    const response = await fetch(`/api/orders/${order_id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shipping_address,city, first_name, last_name,state })
    })

    if(response.ok) {
        const order = await response.json()
        dispatch(updateOrder(order))
    }
}

export const deleteOrder = (data) => async (dispatch) => {
    console.log(data)
    const response = await fetch(`api/orders/${data}`,{
        method: "DELETE"
    })

    if(response.ok) {
        const order = await response.json()
        dispatch(removeOrder(order))
    }
}
const initialState = {}

const orderReducer = (state = initialState, action) =>{
    let newState = clone(state);
    switch (action.type) {
        case LOAD_ORDERS:

            const newObj ={}
            action.orders.orders.forEach((order)=>{
                newObj[order.id] = order
                const productObj = {}
                newObj[order.id].products.forEach((product)=>{
                    productObj[product.id] = product
                })
                newObj[order.id].products = productObj
            })

            newState = newObj
            return newState
        case ADD_ORDER:
            newState[action.order.id] = action.order
            return newState
        case UPDATE_ORDER:
            newState[action.order.id] = action.order
            return newState
        case REMOVE_ORDER:
            delete newState[action.order.id]
            return newState
        default:
            return newState
    }
}

export default orderReducer
