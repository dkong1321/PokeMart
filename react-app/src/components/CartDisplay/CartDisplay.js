import { useEffect, useState } from "react"
import { useDispatch , useSelector} from "react-redux"
import CartProduct from "./CartProduct"
import {clearCart} from "../../store/cart"
const CartDisplay = () => {
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

    // const removeMyCart = () => {
    //     dispatch(clearCart())
    // }

    return (
        isLoaded && (
            <div>
                <div>hello from your cart</div>
                <form>
                {Object.values(cartProducts)?.map((product)=>{
                    return (
                        <div key={product.id}>
                            <div>{product.id}</div>
                            <CartProduct product={product} count={cartCounts[product.id]}></CartProduct>
                        </div>
                    )
                }
                )}
                <div>{getTotal()}</div>
                <button>Submit Order</button>

                </form>
            </div>
        )
    )
}

export default CartDisplay
