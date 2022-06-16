import { useEffect, useState } from "react"
import { useDispatch , useSelector} from "react-redux"
import AddOrderForm from "./AddOrderForm"
import "./checkout.css"
// import {clearCart} from "../../store/cart"
const Checkout = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const cartProducts = (useSelector((state)=>state.cart.products))
    const cartCounts = useSelector((state=>state.cart.count))
    const cartTotal = useSelector((state=>state.cart.cartTotal))
    const getTotal = () =>{
        const initalVal = 0
        const myCartTotal = Object.values(cartTotal).reduce(
            (accum,curr) => accum+curr,
            initalVal
        )
        return myCartTotal
    }

    useEffect(()=>{
        setIsLoaded(true)
    }, [dispatch, cartTotal])


    return (
        isLoaded && (
            <div>
                {cartProducts && Object.values(cartProducts).length?
                <div className="co__order__container">
                <AddOrderForm/>
                <div className="co__order__items__container">
                    <div className="co__order__header__container">
                        <div>Product</div><div className="order__description">Description</div><div>Qty</div><div>Total</div>
                    </div>
                    {Object.values(cartProducts)?.map((product)=>{
                        return (
                            <div key={product.id}>
                                <div className="cart__product__container">
            <img className="product__cart__image" src={product.product.product_image_url} alt=""></img>
                <div>
                    <div>{product.product.product_name}</div>
                    <div className="co__product__cart__description">{product.product.description}</div>
                    </div>
                        <div>{cartCounts[product.id]}</div>
                        <div>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.product.price*cartCounts[product.id])}</div>
                    </div>
                </div>
                        )
                    }
                    )}
                    <div className="order__price__details">
                        <div className="">SubTotal :{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getTotal())}</div>
                        <div className="">Tax :{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getTotal()*.10)}</div>
                        <div className="black__line"></div>
                        <div className="cart__total__price">Total :{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getTotal()*1.10)}</div>
                    </div>
                </div>
            </div>
                :
                <div className="empty__order__items__container">
                    <h1>Your Cart is Empty</h1>
                </div>}
            </div>

        )
    )
}

export default Checkout
