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

    useEffect(()=>{
        dispatch(getAllProducts()).then(()=>setIsLoaded(true))
    }, [dispatch]);

    return(
        isLoaded && (
            <div>
                <div>Hello in ProductDisplay</div>
                <div className="products__display__container">
                    {Object.values(products[0]).map((product)=>{
                        return (
                            <div key={product.id} >
                                <Link to={`/products/${product.id}`} key={product.id} className="product__card">
                                    <div className="product__name">{product.product_name}</div>
                                    <img className="product__image" src={product.product_image_url} alt=""></img>
                                </Link>
                                    <div className="product__price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    )
}

export default ProductsDisplay
