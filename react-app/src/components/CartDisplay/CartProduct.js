import "./cart_product.css"
import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { deleteCartItem, setItemQuantity} from "../../store/cart"
import { getCart } from "../../store/cart"


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
        if(quantity>9) {
            return
        }
        dispatch(setItemQuantity(product, quantity+1,cartUserId)).then(()=>dispatch(getCart(user.id)))
    }

    const decrementQty = (e) => {
        e.preventDefault()
        if(quantity===1){
            dispatch(deleteCartItem(product, cartUserId)).then(()=>dispatch(getCart(user.id)))
        } else {
            dispatch(setItemQuantity(product, quantity-1,cartUserId)).then(()=>dispatch(getCart(user.id)))
        }
    }

    const removeFromCart = (e) => {
        e.preventDefault()
        dispatch(deleteCartItem(product, cartUserId)).then(()=>dispatch(getCart(user.id)))
    }

    return(
        <div className="cart__product__container">
            <img className="product__cart__image" src={product.product.product_image_url} alt=""></img>
            <div>
                <div>{product.product.product_name}</div>
                <div className="product__cart__description">{product.product.description}</div>
                <button className="remove__cart__item__button" onClick={(e)=>removeFromCart(e)}><i className="fa-solid fa-xmark fa-lg"></i> Remove</button>
            </div>

            <div className="cart__qty__container">
                <button  className="plus__minus__buttons" onClick={(e)=>incrementQty(e)}><i className="fa-solid fa-plus"></i></button>
                <div>{quantity}</div>
                <button className="plus__minus__buttons" onClick={(e)=>decrementQty(e)}><i className="fa-solid fa-minus"></i></button>
            </div>
            <div>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.product.price)}</div>
            <div>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.product.price*quantity)}</div>
        </div>
    )
}

export default CartProduct
