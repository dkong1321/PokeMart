import { useEffect, useState } from "react"
import { useDispatch , useSelector} from "react-redux"
import CartProduct from "./CartProduct"
import { setItemQuantity} from "../../store/cart"

const CartDisplay = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const cart = (useSelector((state)=>state.cart))

    useEffect(()=>{
        setIsLoaded(true)
    }, [dispatch])

    const cartTotal = () => {
        let total=0
        Object.values(cart).forEach((product)=>{
            console.log(product.price)
            console.log(product.quantity)
            total += product.price*product.quantity
        })
        return total
    }

    return (
        isLoaded && (
            <div>
                <div>hello from your cart</div>
                <form>
                {Object.values(cart).map((product)=>{
                    return (
                        <div key={product.id}>
                            <CartProduct product={product}></CartProduct>
                        </div>
                    )
                }
                )}
                <div></div>
                <button>Submit Order</button>
                </form>
                <div>price{Object.keys(cart).length} </div>
                <div>{cartTotal()}</div>
            </div>
        )
    )
}

export default CartDisplay
