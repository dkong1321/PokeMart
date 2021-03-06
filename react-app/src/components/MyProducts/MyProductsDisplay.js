import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/product";
import {Link} from "react-router-dom"
import EditProductFormModal from "../Modals/EditProductFormModal";
import DeleteProductFormModal from "../Modals/DeleteProductModal";
import "./my__product.css"

const MyProducts = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const user =useSelector((state)=> state.session.user)
    const allProducts = Object.values(useSelector((state)=> state.products))

    useEffect(()=>{
        dispatch(getAllProducts()).then(()=>setIsLoaded(true))

    }, [dispatch]);

    return(
        isLoaded && (
            <div>
                <div className="my__products__display__container">
                    {Object.values(allProducts[0]).filter((product)=> product.user_id === user.id).length ?
                        Object.values(Object.values(allProducts[0]).reverse().filter((product)=> product.user_id === user.id)).map((product)=>{
                        return (
                            <div key={product.id} className="my__product__card">
                                <Link to={`/products/${product.id}`} key={product.id} className="my__product__details">
                                    <div className="my__product__name__image__container">
                                        <img className="my__product__image" src={product.product_image_url} alt=""></img>
                                        <div className="product__name">{product.product_name}</div>
                                    </div>
                                    <div className="my__product__description">{product.description}</div>
                                    <div className="product__price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(product.price)}</div>
                                </Link>
                                    <div className="my__product__button__container">
                                        <EditProductFormModal product={product}/>
                                        <DeleteProductFormModal product={product}/>
                                    </div>
                            </div>
                        )
                    }) : <div>Add a Product to view it here!</div>

                    }

                </div>

            </div>
        )
    )
}

export default MyProducts
