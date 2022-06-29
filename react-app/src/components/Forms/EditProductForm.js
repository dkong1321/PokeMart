import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../store/product";
import "./edit__product__form.css"

const EditProductForm = ({setShowModal,product}) => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [image, setImage] = useState(null);
    const [name, setName] = useState(product.product_name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);

    const [errorName, setErrorName] = useState([])
    const [errorDescription, setErrorDescription] = useState([])
    const [errorPrice, setErrorPrice] = useState([])
    const [errorImage, setErrorImage] = useState([])
    const uploadHiddenInput = useRef()

    const user =useSelector((state)=> state.session.user)

    useEffect(()=>{
        setIsLoaded(true)
    }, [dispatch]);

    const editProduct = async(e) => {
        e.preventDefault()
        const errorNameValidation = []
        const errorDescriptionValidation =[]
        const errorPriceValidation = []
        const errorImageValidation = []

        if(!name.length || name.trim().length===0){
            errorNameValidation.push("Product name cannot be empty")

        }
        if(name.length>30){
            errorNameValidation.push("Product name cannot be more than 30 characters")

        }

        if(!description.length || description.trim().length===0){
            errorDescriptionValidation.push("Product description cannot be empty")

        }
        if(description.length>355){
            errorDescriptionValidation.push("Product description cannot be more than 355 characters")

        }
        if(price<1){
            errorPriceValidation.push("Price cannot be negative or less than 1")

        }
        if(price > 999999999){
            errorPriceValidation.push("Price seems too large please check and submite")

        }

        if(!image){
            errorImageValidation.push("Please upload a image")
        } else if(image.type !=="image/jpeg" && image.type !=="image/png" && image.type !=="image/jpg"){
                errorImageValidation.push("Invalid file type")
        }

        if (errorNameValidation.length || errorDescriptionValidation.length || errorPriceValidation.length){
            setErrorName(errorNameValidation)
            setErrorDescription(errorDescriptionValidation)
            setErrorPrice(errorPriceValidation)
            setErrorImage(errorImageValidation)
            return
        }

        const product_id = product.id
        const data = {
            name,
            price,
            description,
            image,
            product_id,
            user_id:user.id,
        }
        dispatch(updateProduct(data))
        setShowModal(false)
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const chooseImage = (e)=> {
        e.preventDefault()
        setErrorImage([])
        uploadHiddenInput.current.click()
    }

    return(
        isLoaded && (
            <div className="edit__product__container">
                <div className="modal__form__heading">Make a Change to Your Listing</div>
                <form onSubmit={editProduct} className="edit__product__form">
                    <div>
                        <label className='input__label'>Product Name</label>
                        {errorName ? <div className="input__error">{errorName}</div> : <></>}
                        <input className="product__form__input" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Description</label>
                        {errorDescription ? <div className="input__error">{errorDescription}</div> : <></>}
                        <input className="product__form__input" value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <label className='input__label'>Price</label>
                        {errorPrice ? <div className="input__error">{errorPrice}</div> : <></>}
                        <input className="product__form__input" type='number' value={price} onChange={e => setPrice(e.target.value)} pattern='[0-9]+(\\.[0-9][0-9]?)?' placeholder="0.00" min="0.00" step="0.01"/>
                    </div>
                    <div className="image__select__container">
                        <label className='input__label'>Change Image if Needed</label>
                        {errorImage ? <div className="input__error">{errorImage}</div> : <></>}
                        {image ? <>{image.type}</>: null}
                        <button className="edit__product__image__button" onClick={chooseImage}>Choose Image</button>
                        <input className="product__form__input" type ="file" accept="image/*" onChange={updateImage} hidden ref={uploadHiddenInput}/>
                    </div>
                    <button className="submit__edit__product__button" type="submit">Submit</button>
                </form>
            </div>
        )
    )
}


export default EditProductForm
