import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getOrders, postOrder, editOrder, deleteOrder} from "../store/order"
const Orders = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ shipping, setShipping] = useState("")
    const [ editShipping, setEditShipping] = useState("")
    const user = useSelector((state)=> state.session.user)
    const orders = useSelector((state)=> state.orders)
    const cart = useSelector((state)=> state.cart)
    const cartTotal = useSelector((state=>state.cart.cartTotal))

    const x =1

    useEffect(()=>{
        console.log("use effect runs here")

        dispatch(getOrders(user.id)).then(()=>setIsLoaded(true))
    }, [dispatch])

    const getTotal = () =>{
        const initalVal = 0
        const myCartTotal = Object.values(cartTotal).reduce(
            (accum,curr) => accum+curr,
            initalVal
        )
        return myCartTotal
    }

    const submitOrder = (e) => {
        e.preventDefault()
        const cartItems = Object.keys(cart.products)
        const data={
            shipping_address:shipping,
            user_id :user.id,
            total_price : getTotal(),
            order_products: cartItems
        }

        dispatch(postOrder(data))
    }

    const editShippingOrder = (e) => {
        e.preventDefault()
        const order_id = 5
        const data={
            shipping_address:editShipping,
            order_id
        }

        dispatch(editOrder(data))
    }

    const cancelOrder = (order) => {
        const order_id = order.id
        dispatch(deleteOrder(order_id))
    }

    return (
        isLoaded && (
            <div>
                <div>My Order</div>
                {Object.values(orders).map((order)=>{
                    return (
                        <div key={order.id}>
                            <div>{order.id}</div>
                            <div>{order.shipping_address}</div>
                            {/* {Object.values(order.products).map((product)=>{
                                return (
                                    <div>
                                        <div>{product.product_name}</div>
                                        <img src={product.product_image_url}></img>
                                    </div>
                                )
                            })} */}
                            <div>{order.timestamp}</div>
                            <button onClick={()=> cancelOrder(order)}>cancel</button>
                        </div>
                    )
                })}
                <form onSubmit={submitOrder}>
                    <input value={shipping} onChange={e=> setShipping(e.target.value)} placeholder="enter shipping"></input>
                    <button type="submit">Submit</button>
                </form>

                <form onSubmit={editShippingOrder}>
                    <input value={editShipping} onChange={e=> setEditShipping(e.target.value)} placeholder="edit shipping"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    )
}

export default Orders
