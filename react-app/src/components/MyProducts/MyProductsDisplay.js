import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, deleteProduct } from "../../store/product";
import {Link} from "react-router-dom"
import EditProductFormModal from "../Modals/EditProductFormModal";
// import "../product_display.css"

const MyProducts = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const user =useSelector((state)=> state.session.user)
    const allProducts = Object.values(useSelector((state)=> state.products))

    useEffect(()=>{
        dispatch(getAllProducts()).then(()=>setIsLoaded(true))

    }, [dispatch]);

    const eraseProduct = async (product) => {
        const product_id = product.id
        dispatch(deleteProduct(product_id))
    }

    return(
        isLoaded && (
            <div>
                <div className="products__display__container">
                    {console.log(Object.values(allProducts[0]).filter((product)=> product.user_id === user.id))}
                    {Object.values(allProducts[0]).filter((product)=> product.user_id === user.id).length ?
                        Object.values(Object.values(allProducts[0]).filter((product)=> product.user_id === user.id)).map((product)=>{
                        return (
                            <div key={product.id} >
                                <Link to={`/products/${product.id}`} key={product.id} className="product__card">
                                    <div className="product__name">{product.product_name}</div>
                                    <img className="product__image" src={product.product_image_url} alt=""></img>
                                </Link>
                                    <div className="product__price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(product.price)}</div>
                                    <EditProductFormModal product={product}/>
                                    <button onClick={() => eraseProduct(product)}><i className="fa-solid fa-trash-can"></i></button>

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
