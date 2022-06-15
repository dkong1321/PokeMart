import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getOrders, deleteOrder} from "../../store/order"
import moment from "moment";
import "./order_display.css"

const SingleOrder = ({order}) => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [productShow, setProductShow] = useState(false)
    // Form info

    const user = useSelector((state)=> state.session.user)

    useEffect(()=>{
        dispatch(getOrders(user.id)).then(()=>setIsLoaded(true))
        // warning
    }, [dispatch])

    return (
        <div>
            <div className="order__see__more" onClick={()=>setProductShow(!productShow)}><i className="fa-solid fa-circle-chevron-down"></i></div>
            {Object.values(order.products).length ?
            <div>
            {Object.values(order.products).map((product)=>{
                return (
                <div key={product.id}>
                    {productShow && (
                    <div className="product__">
                        <div>{product.product_name}</div>
                        <div>qty: {product.quantity}</div>
                        <img className="order__product__image" alt="" src={product.product_image}></img>
                    </div>
                    )}
                </div>
                )
            })}
            </div>
            : <div>listing has been removed</div>}
        </div>
    )

}

export default SingleOrder
