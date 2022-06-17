import { useEffect, useState } from "react"
import { useDispatch , useSelector} from "react-redux"
import CartProduct from "./CartProduct"
import { NavLink } from "react-router-dom"
import { clearCart } from "../../store/cart"

// import {clearCart} from "../../store/cart"
const CartDisplay = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const cartProducts = (useSelector((state)=>state.cart.products))
    const cartCounts = useSelector((state=>state.cart.count))
    const cartTotal = useSelector((state=>state.cart.cartTotal))
    const user = useSelector((state)=> state.session.user)

    const getTotal = () =>{
        const initalVal = 0
        const myCartTotal = Object.values(cartTotal).reduce(
            (accum,curr) => accum + curr,
            initalVal
        )
        return myCartTotal
    }

    useEffect(()=>{
        setIsLoaded(true)
    }, [dispatch, cartTotal])

    const clearMyCart = () => {
        dispatch(clearCart(user.id))
    }
    return (
        isLoaded && (
            <div>
                {cartProducts && Object.values(cartProducts).length?
                <div>
                <div className="order__container">
                <div className="main__order__items__container">
                    <div className="main__order__header__container">
                        <div>Product</div><div className="order__description">Description</div><div>Qty</div><div>Price</div><div>Total</div>
                    </div>
                    {Object.values(cartProducts)?.map((product)=>{
                        return (
                            <div key={product.id}>
                                <CartProduct product={product} count={cartCounts[product.id]}></CartProduct>
                            </div>
                        )
                    }
                    )}
                </div>
                <div className="checkout__container">

                    <div className="clear__cart__container">
                        <button className="clear__cart__button" onClick={(e)=>clearMyCart(e)}>Clear Cart</button>
                    </div>

                    <div className="order__price__details">
                        <div className="">SubTotal :{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getTotal())}</div>
                        <div className="">Tax :{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getTotal()*.10)}</div>
                        <div className="black__line"></div>
                        <div className="cart__total__price">Total :{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getTotal()*1.10)}</div>
                        <NavLink className="proceed__checkout__button" to='/checkout' exact={true}>Proceed to Checkout</NavLink>
                    </div>
                </div>
                </div>

            </div>
                :
                <div className="order__container">
                    <div className="empty__order__items__container">
                        <h1>Your Cart is Empty</h1>
                        <NavLink to='/products' exact={true}>Add Products to Your Cart Before Checking out!</NavLink>
                    </div>
                </div>
                }
            </div>

        )
    )
}

export default CartDisplay
