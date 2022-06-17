import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/product";
import {Link} from "react-router-dom"
import "./product_display.css"

const ProductsDisplay = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    // refactor maybe
    const products =Object.values(useSelector((state)=> state.products))
    // const user = useSelector((state)=>state.session.users)
    useEffect(()=>{
        dispatch(getAllProducts())
        // dispatch(getCart(user?.id))
        .then(()=>setIsLoaded(true))
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

    return(
        isLoaded && (
            <div className="products__main__container">
                <div className="products__display__container">
                    {Object.values(products[0]).map((product)=>{
                        return (
                            <Link to={`/products/${product.id}`} key={product.id} className="product__link__to__single" >
                                <div key={product.id} className="product__card" >
                                    <div className="all__products__image__container">
                                        <img className="product__image" src={product.product_image_url} alt="product_name"></img>
                                    </div>
                                    <div>
                                        <div className="product__name">{product.product_name}</div>
                                        <div className="product__price__cart__container">
                                            <div className="product__price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
                                            {/* <button>Add to Cart</button> */}
                                        </div>
                                        <div className="product__link__to__single">
                                            {!product.reviews.length ? <></>:
                                                <div className="products__display__reviews">
                                                    <span className="stars" style={{ "--ratingValue": `${avgRating(product)}` }}></span>
                                                    <span>{Object.values(product.reviews).length} Reviews</span>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    )
}

export default ProductsDisplay
