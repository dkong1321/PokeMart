import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, getAllProducts } from "../../store/product";
import { useHistory } from "react-router-dom";

const ProductForm = ({setShowModal}) => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const history = useHistory()
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
        history.push('/products')
        setShowModal(false)

    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return(
        <div>
            <div>New Product Form</div>
            <form onSubmit={makeNewProduct}>
                <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="enter product name"/>
                <input value={description} onChange={e => setDescription(e.target.value)} placeholder="enter product name"/>
                <input type='number' value={price} onChange={e => setPrice(e.target.value)} pattern='[0-9]+(\\.[0-9][0-9]?)?' placeholder="0.00" min="0.00" step="0.01"/>
                <input type ="file" accept="image/*" onChange={updateImage}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ProductForm
