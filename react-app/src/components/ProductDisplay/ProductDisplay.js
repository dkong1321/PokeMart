import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/product";
import { useParams} from "react-router-dom";
import {addCartItem, setItemQuantity, getCart } from "../../store/cart";
import {Link} from "react-router-dom"
import "./product_display.css"

const ProductsDisplay = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ productOwner, setProductOwner] = useState([])
    const [ productQuantity, setProductQuantity] = useState()
    // refactor maybe
    const products =Object.values(useSelector((state)=> state.products))
    const cart = (useSelector((state)=>state.cart))
    const user = useSelector((state)=>state.session.user)
    const productId = useParams().productId


    useEffect(()=>{
        dispatch(getAllProducts())
        // dispatch(getCart(user?.id))
        .then(()=>setIsLoaded(true))
        console.log(productQuantity)
    }, [dispatch]);

    const avgRating = (product) => {
        const reviews = Object.values(product.reviews)
        const length = reviews.length
        let totalRating = 0
        reviews.forEach((review)=>{
            totalRating+=review.rating
        })
        return Math.round(totalRating/length*2)/2
    }

    const addToCart = (product) => {
        const currCartProduct = Object.values(cart.products)
        let inCart = false
        let cartQuantity = 0
        console.log(cart)
        console.log(product)
        for (let i = 0; i < currCartProduct.length; i++ ){
            if (currCartProduct[i].product_id === product.id){
                inCart = true
                cartQuantity=Object.values(Object.values(cart)[2])[i]
            }
        }
        const cartUserId = user.id
        const quantity = cartQuantity
        setProductQuantity(quantity)
        const myProduct = {product_id:product.id}
        if (inCart) {
            dispatch(setItemQuantity(myProduct, quantity+1,cartUserId)).then(()=>dispatch(getCart(user.id)))

        } else {
            dispatch(addCartItem(product, cartUserId)).then(()=>dispatch(getCart(user.id)))
        }
        console.log(cart)
        console.log(product)
    }

    return(
        isLoaded && (

            <div className="products__main__container">
                <div className="products__heading">All Products</div>
                {/* {console.log(Object.values(cart.products).filter((product)=>(product.product_id === parseInt(productId)))[0]?.quantity)} */}
                <div className="products__display__container">
                    {Object.values(products[0]).reverse().map((product)=>{
                        return (
                            <div className="product__card">
                            <Link to={`/products/${product.id}`} key={product.id} className="product__link__to__single" >
                                <div key={product.id} >
                                    <div className="all__products__image__container">
                                        <img className="product__image" src={product.product_image_url} alt="product_name"></img>
                                    </div>
                                    <div>
                                        <div className="product__name">{product.product_name}</div>
                                        <div className="product__price__cart__container">
                                            <div className="product__price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
                                        </div>
                                        <div className="product__link__to__single">
                                            {!product.reviews.length ? <></>:
                                                <div className="products__display__reviews">
                                                    <span className="all__products__stars" style={{ "--ratingValue": `${avgRating(product)}` }}></span>
                                                    <span>{Object.values(product.reviews).length} Reviews</span>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                </div>
                            </Link>
                            {/* add cart button */}
                            {/* {user === null || user.id === product.user_id ?
                             <></>:
                                <div className="product__button__container">
                                    { productQuantity > 8 || Object.values(cart.products).filter((x)=>(x.product_id === parseInt(product.id)))[0]?.quantity>9 ?
                                    <div className="product__card__disabled__cart__button">Max Qty</div>:
                                    <button className="product__card__add__button" onClick={(e) => addToCart(product)}>+</button>
                                    }
                                </div>
                             } */}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    )
}

export default ProductsDisplay
