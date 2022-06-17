import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, getAllProducts } from "../../store/product";
import { useHistory } from "react-router-dom";
import loadingGif from "./279032259_1047884352471825_57850663476320908_n.gif"
const ProductForm = ({setShowModal}) => {
    const dispatch = useDispatch()
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [productLoading, setProductLoading] = useState(false)
    const history = useHistory()
    const user =useSelector((state)=> state.session.user)

    const [errorName, setErrorName] = useState([])
    const [errorDescription, setErrorDescription] = useState([])
    const [errorPrice, setErrorPrice] = useState([])
    const [errorImage, setErrorImage] = useState([])



    useEffect(()=>{
        dispatch(getAllProducts())
    }, [dispatch]);

    const makeNewProduct = async(e) => {
        e.preventDefault()

        const errorNameValidation = []
        const errorDescriptionValidation =[]
        const errorPriceValidation = []
        const errorImageValidation = []
        if(!productName.length || productName.trim().length===0){
            errorNameValidation.push("Product name cannot be empty")

        }
        if(productName.length>30){
            errorNameValidation.push("Product name cannot be more than 30 characters")

        }
        if(!description.length || description.trim().length===0){
            errorDescriptionValidation.push("Product description cannot be empty")

        }
        if(description.length>355){
            errorDescriptionValidation.push("Product description cannot be more than 355 characters")

        }
        if(price<1){
            errorPriceValidation.push("Price cannot be negative less than 1 dollar")

        }
        if(price > 999999999){
            errorPriceValidation.push("Price is seems too large please check and submit")

        }
        if(image !=="image/jpeg" || image !=="image/png" || image !=="image/jpg"){
            errorImageValidation.push("Invalid file type")
        }

        if (errorNameValidation.length || errorDescriptionValidation.length || errorPriceValidation.length){
            setErrorName(errorNameValidation)
            setErrorDescription(errorDescriptionValidation)
            setErrorPrice(errorPriceValidation)
            setErrorImage(errorImageValidation)
            return
        }

        const data = {
            productName,
            user_id:user.id,
            price,
            description,
            image
        }

        await setProductLoading(true)
        // setTimeout(async()=>{
        //     await dispatch(createProduct(data))
        //     await setProductLoading(false)
        //     await setShowModal(false)
        //     await history.push('/products')
        // }, 1000)
        await dispatch(createProduct(data))
        await setProductLoading(false)
        setShowModal(false)
        history.push('/products')

    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return(
        <div>
            {productLoading &&
                <div>
                <div>Loading...</div>
                <img className="loading__gif" src={loadingGif}></img>
                </div>
                }
            {!productLoading &&
            <div>
                <div>New Product Form</div>
                <form onSubmit={makeNewProduct}>
                    <div>
                        <label>Product Name</label>
                        {errorName ? <div>{errorName}</div> : <></>}
                        <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="enter product name"/>
                    </div>
                    <div>
                        <label>Description</label>
                        {errorDescription ? <div>{errorDescription}</div> : <></>}
                        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="enter product name"/>
                    </div>
                    <div>
                        <label>Price</label>
                        {errorPrice ? <div>{errorPrice}</div> : <></>}
                        <input type='number' value={price} onChange={e => setPrice(e.target.value)} pattern='[0-9]+(\\.[0-9][0-9]?)?' placeholder="0.00" min="0.00" step="0.01"/>
                    </div>
                    <div>
                        <label>Add Image</label>
                        {errorImage ? <div>{errorImage}</div> : <></>}
                        <input required type ="file" accept="image/*" onChange={updateImage}/>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
            }
        </div>
    )
}

export default ProductForm
