import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./order_display.css"

const SingleOrder = ({order}) => {
    const dispatch = useDispatch()
    const [productShow, setProductShow] = useState(false)
    // Form info


    useEffect(()=>{
        // setIsLoaded(true)
        // warning
    }, [dispatch])

    return (
        <div>
            {Object.values(order.products).length ?
                <div>
                    <div className="order__see__more" onClick={()=>setProductShow(!productShow)}><i className="fa-solid fa-circle-chevron-down"></i></div>
                </div>
            :<div>Listing has been removed</div>}
            {/* <div className="order__see__more" onClick={()=>setProductShow(!productShow)}><i className="fa-solid fa-circle-chevron-down"></i></div> */}
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
            : <></>}
        </div>
    )

}

export default SingleOrder
