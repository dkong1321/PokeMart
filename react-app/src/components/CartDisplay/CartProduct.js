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
    return(
        <div className="cart__product__container">
            <img className="product__cart__image" src={product.product.product_image_url} alt=""></img>
            <div>
                <div>{product.product.product_name}</div>
                <div className="product__cart__description">{product.product.description}</div>
                <button className="remove__cart__item__button" onClick={(e)=>removeFromCart(e)}><i className="fa-solid fa-xmark fa-lg"></i> Remove</button>
            </div>

            <div>
                <button  className="plus__minus__buttons" onClick={(e)=>incrementQty(e)}><i className="fa-solid fa-plus"></i></button>
                <input className="cart__product__input" type="number" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}
                     onBlur={() => updateQty()} min="1" max="10" increment="1"
                    ></input>
                <button className="plus__minus__buttons" onClick={(e)=>decrementQty(e)}><i className="fa-solid fa-minus"></i></button>
            </div>
            <div>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.product.price)}</div>
            <div>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.product.price*quantity)}</div>
        </div>
    )
}

export default CartProduct
