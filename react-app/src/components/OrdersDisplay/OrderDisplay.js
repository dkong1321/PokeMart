import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getOrders, deleteOrder} from "../../store/order"
import moment from "moment";
import "./order_display.css"

const OrderDisplay = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    // Form info

    const user = useSelector((state)=> state.session.user)
    const orders = useSelector((state)=> state.orders)
    const cart = useSelector((state)=> state.cart)
    const cartTotal = useSelector((state=>state.cart.cartTotal))

    useEffect(()=>{
        dispatch(getOrders(user.id)).then(()=>setIsLoaded(true))
        // warning
    }, [dispatch])

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
                <div>Your Orders</div>
                {Object.values(orders).map((order)=>{
                    return (
                        <div key={order.id} className="single__order__container">
                            <div>Shipping Info</div>
                            <div>{order.shipping_address}</div>
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
                            {order.delivered ? (<></>):(<button onClick={()=> cancelOrder(order)}>cancel</button>)}
                        </div>
                    )
                })}
            </div>
        )
    )
}

export default OrderDisplay
