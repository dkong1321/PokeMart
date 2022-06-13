import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getOrders, postOrder, deleteOrder} from "../../store/order"
import {clearCart} from "../../store/cart"
import moment from "moment";
import "./order_display.css"

const OrderDisplay = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ shipping, setShipping] = useState("")
    const user = useSelector((state)=> state.session.user)
    const orders = useSelector((state)=> state.orders)
    const cart = useSelector((state)=> state.cart)
    const cartTotal = useSelector((state=>state.cart.cartTotal))

    useEffect(()=>{
        dispatch(getOrders(user.id)).then(()=>setIsLoaded(true))
        // warning
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
        const cartItems = Object.values(cart.products)
        const cartItemQty = Object.values(cart.count)
        for (let i=0; i<cartItems.length; i++) {
            cartItems[i].quantity=cartItemQty[i]
        }
        const data={
            shipping_address:shipping,
            user_id :user.id,
            total_price : getTotal(),
            order_products: cartItems,
        }
        dispatch(postOrder(data)).then(()=>dispatch(clearCart()))
    }

    const cancelOrder = (order) => {
        const order_id = order.id
        dispatch(deleteOrder(order_id))
    }

    const formatDate = (date) => {
        const newDate = moment(date).format("DD/MM/YY hh:mm a");
        return newDate;
    };

    return (
        isLoaded && (
            <div>
                <div>My Order</div>
                <form onSubmit={submitOrder}>
                    <input value={shipping} onChange={e=> setShipping(e.target.value)} placeholder="enter shipping"></input>
                    <button type="submit">Submit</button>
                </form>
                {Object.values(orders).map((order)=>{
                    return (
                        <div key={order.id} className="single__order__container">
                            <div>Shipping Address{order.shipping_address}</div>
                            <div>Date: {formatDate(order.timestamp)}</div>
                            {order.delivered ? (<div>delivered</div>):(<div>pending</div>)}

                            {Object.values(order.products).map((product)=>{
                                return (
                                    <div key={product.id}>
                                        <div>{product.product_name}</div>
                                        <div>qty: {product.quantity}</div>
                                        <img className="order__product__image" alt="" src={product.product_image}></img>
                                    </div>
                                )
                            })}
                            {/* {Object.values(order.products).map((product)=>{
                                return (
                                    <div key={product.id}>
                                        <div>{product.product.product_name}</div>
                                        <div>qty: {product.quantity}</div>
                                        <img className="order__product__image" alt="" src={product.product.product_image_url}></img>
                                    </div>
                                )
                            })} */}
                            {order.delivered ? (<></>):(<button onClick={()=> cancelOrder(order)}>cancel</button>)}
                        </div>
                    )
                })}
            </div>
        )
    )
}

export default OrderDisplay
