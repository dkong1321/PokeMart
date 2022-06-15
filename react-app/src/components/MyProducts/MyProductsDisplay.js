import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../../store/product";
import {Link} from "react-router-dom"
import EditProductFormModal from "../Modals/EditProductFormModal";
// import "../product_display.css"

const MyProducts = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editDescription, setEditDescription] = useState("");
    // const [editImage, setEditImage] = useState(null);
    // refactor maybe
    const user =useSelector((state)=> state.session.user)
    const allProducts = Object.values(useSelector((state)=> state.products))
    // const test = allProducts.map((product => product))
    // const prodArr = Object.values(allProducts[0])
    // const filterProducts = Object.values(allProducts[0]).filter((product)=> product.user_id === user.id)
    // console.log(filterProducts)

    useEffect(()=>{
        dispatch(getAllProducts()).then(()=>setIsLoaded(true))

    }, [dispatch]);

    const editProduct = async(e) => {
        e.preventDefault()
        const product_id = 5
        const data = {
            editName,
            editPrice,
            editDescription,
            image,
            product_id,
            user_id:user.id,
        }
        dispatch(updateProduct(data))
    }

    const eraseProduct = async (product) => {
        const product_id = product.id
        dispatch(deleteProduct(product_id))
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return(
        isLoaded && (
            <div>
                <div>Hello in ProductDisplay</div>
                <div className="products__display__container">
                    {Object.values(allProducts[0]).filter((product)=> product.user_id === user.id) ?
                        Object.values(Object.values(allProducts[0]).filter((product)=> product.user_id === user.id)).map((product)=>{
                        return (
                            <div key={product.id} >
                                <Link to={`/products/${product.id}`} key={product.id} className="product__card">
                                    <div className="product__name">{product.product_name}</div>
                                    <img className="product__image" src={product.product_image_url} alt=""></img>
                                </Link>
                                    <div className="product__price">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
                                    <EditProductFormModal product={product}/>
                                    <button onClick={() => eraseProduct(product)}><i className="fa-solid fa-trash-can"></i></button>

                            </div>
                        )
                    }) : <></>
                    }
                    {}
                </div>

            </div>
        )
    )
}

export default MyProducts
