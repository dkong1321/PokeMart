import rfdc from "rfdc";
const clone = rfdc()

const LOAD_ORDERS = "api/products/LOAD_ORDERS"

const loadOrder = (orders) => {
    return {
        type: LOAD_ORDERS,
        orders
    }
}

export const getOrders = (data) => async (dispatch) => {
    console.log(data)
    const response = await fetch(`/api/orders/${data}`)

    if (response.ok) {
        const orders = await response.json()
        dispatch(loadOrder(orders))
    }
}

export const postOrder = (data) => async (dispatch) => {
    console.log(data)
    const formData = new FormData();
    formData.append("shipping_address", data.shipping_address)
    formData.append("user_id", data.user_id)
    formData.append("total_price", data.total_price)

    const response = await fetch(`/api/orders/`, {
        method:"POST",
        body: formData
    })

    // if (response.ok) {
    //     const orders = await response.json()
    //     console.log(orders)
    // }
}
const initialState = {}

const orderReducer = (state = initialState, action) =>{
    let newState = clone(state);
    switch (action.type) {
        case LOAD_ORDERS:
            console.log(action.orders)
            const newObj ={}
            action.orders.orders.forEach((order)=>{
                newObj[order.id] = order
            })
            console.log(newObj)
            newState = newObj
            return newState
        default:
            return newState
    }
}

export default orderReducer
