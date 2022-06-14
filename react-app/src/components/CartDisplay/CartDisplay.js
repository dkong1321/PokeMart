import { useEffect, useState } from "react"
import { useDispatch , useSelector} from "react-redux"
import CartProduct from "./CartProduct"
import AddOrderForm from "./AddOrderForm"
// import {clearCart} from "../../store/cart"
const CartDisplay = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const cartProducts = (useSelector((state)=>state.cart.products))
    const cartCounts = useSelector((state=>state.cart.count))
    const cartTotal = useSelector((state=>state.cart.cartTotal))

    console.log(cartProducts)
    console.log(cartTotal)
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

    // const removeMyCart = () => {
    //     dispatch(clearCart())
    // }

    return (
        isLoaded && (
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
                    <div className="order__price__details">
                        <div className="">SubTotal :{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(getTotal())}</div>
                        <div className="">Tax :{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(getTotal()*.10)}</div>
                        <div className="black__line"></div>
                        <div className="cart__total__price">Total :{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(getTotal()*1.10)}</div>
                    </div>

                </div>
                <AddOrderForm/>
            </div>
        )
    )
}

export default CartDisplay
