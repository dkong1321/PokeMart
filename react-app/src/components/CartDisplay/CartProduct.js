import "./cart_product.css"
import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import { setItemQuantity} from "../../store/cart"

function CartProduct ({product}) {
    const [quantity, setQuantity] = useState(product.quantity)
    const dispatch = useDispatch()
    product.quantity= parseInt(quantity)


    // useEffect(()=>{
    //     // dispatch(getCart())
    //     dispatch(setItemQuantity(data))

    // }, [dispatch])

    const myFunc = (e) =>{
        setQuantity(parseInt(e.target.value))
        product.quantity = parseInt(quantity)
        const data={
            product
        }
        dispatch(setItemQuantity(data))
    }

    return(
        <div>
            <div>{product.product_name}</div>
            <img className="product__cart__image" src={product.product_image_url}></img>
            <div>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
            <input value={quantity} type="number" onChange={(e)=> myFunc(e)} min="1"></input>
            <div>{product.quantity}</div>
        </div>
    )
}

export default CartProduct
