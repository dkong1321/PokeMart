import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, getAllProducts } from "../../store/product";
import { useHistory } from "react-router-dom";
import loadingGif from "./279032259_1047884352471825_57850663476320908_n.gif"
import "./product__form.css"
const ProductForm = ({setShowModal}) => {
    const dispatch = useDispatch()
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("none");
    const [productLoading, setProductLoading] = useState(false)
    const history = useHistory()
    const user =useSelector((state)=> state.session.user)
    const uploadHiddenInput = useRef()
    const [errorName, setErrorName] = useState([])
    const [errorDescription, setErrorDescription] = useState([])
    const [errorPrice, setErrorPrice] = useState([])
    const [errorImage, setErrorImage] = useState([])
    const [errorCategory, setErrorCategory] = useState([])



    useEffect(()=>{
    }, [dispatch]);

    const makeNewProduct = async(e) => {
        e.preventDefault()

        const errorNameValidation = []
        const errorDescriptionValidation =[]
        const errorPriceValidation = []
        const errorImageValidation = []
        const errorCategoryValidation = []


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
            errorPriceValidation.push("Price seems too large please check and submit")
        }

        if(!image){
            errorImageValidation.push("Please upload a image")
        } else if(image.type !=="image/jpeg" && image.type !=="image/png" && image.type !=="image/jpg"){
                errorImageValidation.push("Invalid file type")
        }

        if(category === "none"){
            errorCategoryValidation.push("Please select a Category")
        }

        if (errorNameValidation.length || errorDescriptionValidation.length || errorPriceValidation.length || errorImageValidation.length ){
            setErrorName(errorNameValidation)
            setErrorDescription(errorDescriptionValidation)
            setErrorPrice(errorPriceValidation)
            setErrorImage(errorImageValidation)
            setErrorCategory(errorCategoryValidation)
            return
        }

        const data = {
            productName,
            user_id:user.id,
            price,
            description,
            image,
            category
        }
        await setProductLoading(true)
        await dispatch(createProduct(data))
        await setProductLoading(false)
        setShowModal(false)
        history.push(`/users/${user.id}`)

    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        console.log(file)
        setImage(file);
    }

    const chooseImage = (e)=> {
        e.preventDefault()
        setErrorImage([])
        uploadHiddenInput.current.click()
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
            <div className="product__modal__container">
                <div className="modal__form__heading">Submit a New Listing!</div>
                <form onSubmit={makeNewProduct} className="new__product__form__container">
                    <div>
                        <label className="input__label">Product Name</label>
                        {errorName ? <div className="input__error">{errorName}</div> : <></>}
                        <input className="product__form__input" value={productName} onChange={e => setProductName(e.target.value)} placeholder="enter product name"/>
                    </div>
                    <div>
                        <label className="input__label">Description</label>
                        {errorDescription ? <div className="input__error">{errorDescription}</div> : <></>}
                        <input className="product__form__input" value={description} onChange={e => setDescription(e.target.value)} placeholder="enter description"/>
                    </div>
                    <div>
                        <label className="input__label">Price</label>
                        {errorPrice ? <div className="input__error">{errorPrice}</div> : <></>}
                        <input className="product__form__input" type='number' value={price} onChange={e => setPrice(e.target.value)} pattern='[0-9]+(\\.[0-9][0-9]?)?' placeholder="0.00" min="0.00" step="0.01"/>
                    </div>

                    <div>
                        <label className="input__label">Category</label>
                        {errorCategory ? <div className="input__error">{errorCategory}</div> : <></>}
                        <select id="category" value={category} className="product__form__input__select" onChange={e=>setCategory(e.target.value)}>
                            <option value="none">-----</option>
                            <option value="1">Plush</option>
                            <option value="2">Card</option>
                            <option value="3">Figure</option>
                            <option value="4">Game</option>
                        </select>
                    </div>

                    <div className="image__input__container">
                        <label className="input__label">Add Image</label>
                        {errorImage ? <div className="input__error">{errorImage}</div> : <></>}
                        {image ? <div>{image.type}</div>: null}
                        <button className="product__image__button" onClick={chooseImage}>Choose Image</button>
                        <input className="product__form__input" type ="file" accept="image/*" onChange={updateImage} hidden ref={uploadHiddenInput}/>
                    </div>

                    <button className="submit__product__button" type="submit">Submit</button>
                </form>
            </div>
            }
        </div>
    )
}

export default ProductForm
