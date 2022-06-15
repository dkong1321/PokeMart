import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getOrders, deleteOrder} from "../../store/order"
import SingleOrder from "./SingleOrderDisplay";
import moment from "moment";
import "./order_display.css"
import EditOrderFormModal from "../Modals/OrderFormModal";
import EditOrderForm from "../Forms/EditOrderForm"
const OrderDisplay = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [productShow, setProductShow] = useState(false)
    const [showModal, setShowModal] = useState(false);

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
        // const newDate = moment(date).format("MM/DD/YY hh:mm a");
        const newDate = moment(date).format("dddd MM/DD/YY");
        console.log(date)
        return newDate;
    };

    const checkDelivered = (date) =>{
        const orderDate = moment(date)
        const currentDate = moment().diff(date, 'days');
        return currentDate > 1
    }



    return (
        isLoaded && (
            <div className="main__order__container">
                <div>Your Orders</div>
                <div className="my__order__container">
                {Object.values(orders).map((order)=>{
                    return (
                        <div key={order.id} className="single__order__container">
                            <div className="order__details__container">
                                <div className="order__shipping__details__container">
                                    <div className="order__heading">Shipping To:</div>
                                    <div className="order__shipping__info" >
                                        <div>{order.first_name} {order.last_name}</div>
                                        <div>{order.shipping_address},</div>
                                        <div>{order.city}, {order.state}</div>
                                    </div>

                                </div>
                                <div className="order__date__price__info">
                                    <div className="order__heading">Ordered On:</div>
                                    <div>{formatDate(order.timestamp)}</div>
                                    <div>{checkDelivered(order.timestamp)}</div>
                                    <div className="order__heading">Order Total:</div>
                                    <div>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(order.total_price)}</div>
                                </div>
                                    <div className="order__buttons">
                                        {checkDelivered(order.timestamp) ? (<div className="completed__order__tag"><i className="fa-solid fa-circle-check check__circle"></i> Order Completed</div>):(<button className="cancel__order__button" onClick={()=> cancelOrder(order)}><i className="fa-solid fa-trash-can"></i></button>)}
                                        {/* {checkDelivered(order.timestamp) ? (<></>):(<button className="edit__order__button" onClick={()=> editOrder(order)}><i className="fa-solid fa-pen-to-square"></i></button>)} */}
                                        {checkDelivered(order.timestamp) ? (<></>):(<EditOrderFormModal order={order}/>)}
                                        {/* {showModal && <EditOrderFormModal order={order}/>} */}
                                    </div>
                            </div>
                            <SingleOrder order={order}/>
                        </div>
                    )
                })}
                </div>
            </div>

        )
    )
}

export default OrderDisplay
