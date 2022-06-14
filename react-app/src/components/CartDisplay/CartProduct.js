import "./cart_product.css"
import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { deleteCartItem, setItemQuantity} from "../../store/cart"

function CartProduct ({product, count }) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(count)
    const user = useSelector((state=>state.session.user))
    const cartUserId = user.id
    useEffect(()=>{
        setQuantity(count)
    }, [count])

    const incrementQty = (e) =>{
        e.preventDefault()
        dispatch(setItemQuantity(product, quantity+1,cartUserId))
    }

    const decrementQty = (e) => {
        e.preventDefault()
        dispatch(setItemQuantity(product, quantity-1,cartUserId))
    }

    const removeFromCart = (e) => {
        e.preventDefault()
        dispatch(deleteCartItem(product, cartUserId))
    }

    const updateQty = () => {
        dispatch(setItemQuantity(product, quantity,cartUserId))
    }
    console.log(product)
    return(
        <div>
            <div>{product.product.product_name}</div>
            <img className="product__cart__image" src={product.product.product_image_url} alt=""></img>
            <div>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.product.price)}</div>
            <div>
                <button onClick={(e)=>incrementQty(e)}>+</button>
                <button onClick={(e)=>decrementQty(e)}>-</button>
                <input type="number" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}
                     onBlur={() => updateQty()} min="1" max="10" increment="1"
                    ></input>
                <button onClick={(e)=>removeFromCart(e)}>Remove from Cart</button>
            </div>
        </div>
    )
}

export default CartProduct
