import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getOrders, postOrder} from "../store/order"
const Orders = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ shipping, setShipping] = useState("")
    const user = useSelector((state)=> state.session.user)
    const orders = useSelector((state)=> state.orders)

    useEffect(()=>{
        console.log("use effect runs here")

        dispatch(getOrders(user.id)).then(()=>setIsLoaded(true))
    }, [dispatch])

    const submitOrder = (e) => {
        e.preventDefault()
        const data={
            shipping_address:shipping,
            user_id :user.id,
            total_price : 10
        }
        dispatch(postOrder(data))
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
                            {Object.values(order.products).map((product)=>{
                                return (
                                    <div>
                                        <div>{product.product_name}</div>
                                        <img src={product.product_image_url}></img>
                                    </div>
                                )
                            })}
                            <div>{order.timestamp}</div>
                        </div>
                    )
                })}
                <form onSubmit={submitOrder}>
                    <input value={shipping} onChange={e=> setShipping(e.target.value)} placeholder="enter shipping"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    )
}

export default Orders
