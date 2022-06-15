import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../../store/product";
import {Link} from "react-router-dom"
import "./product_display.css"

const ProductsDisplay = () => {
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
    const products =Object.values(useSelector((state)=> state.products))
    const user =useSelector((state)=> state.session.user)

    useEffect(()=>{
        dispatch(getAllProducts()).then(()=>setIsLoaded(true))
    }, [dispatch]);

    const makeNewProduct = async(e) => {
        e.preventDefault()
        const data = {
            productName,
            user_id:user.id,
            price,
            description,
            image
        }
        dispatch(createProduct(data))
    }

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
                    {Object.values(products[0]).map((product)=>{
                        return (
                            <div key={product.id} >
                                <Link to={`/products/${product.id}`} key={product.id} className="product__card">
                                    <div className="product__name">{product.product_name}</div>
                                    <img className="product__image" src={product.product_image_url} alt=""></img>
                                </Link>
                                    <div className="product__price">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
                                    <button onClick={() => eraseProduct(product)}>delete</button>
                            </div>
                        )
                    })}
                </div>
                <div>New product form</div>
                <form onSubmit={makeNewProduct}>
                    <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="enter product name"/>
                    <input value={description} onChange={e => setDescription(e.target.value)} placeholder="enter product name"/>
                    <input type='number' value={price} onChange={e => setPrice(e.target.value)} pattern='[0-9]+(\\.[0-9][0-9]?)?' placeholder="0.00" min="0.00" step="0.01"/>
                    <input type ="file" accept="image/*" onChange={updateImage}/>
                    <button type="submit">Submit</button>
                </form>

                <div>Edit product form</div>
                <form onSubmit={editProduct}>
                    <input value={editName} onChange={e => setEditName(e.target.value)} placeholder="enter product name"/>
                    <input value={editDescription} onChange={e => setEditDescription(e.target.value)} placeholder="enter product name"/>
                    <input type='number' value={editPrice} onChange={e => setEditPrice(e.target.value)} pattern='[0-9]+(\\.[0-9][0-9]?)?' placeholder="0.00" min="0.00" step="0.01"/>
                    <input type ="file" accept="image/*" onChange={updateImage}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    )
}

export default ProductsDisplay
