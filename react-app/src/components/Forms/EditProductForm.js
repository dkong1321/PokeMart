import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../store/product";
import "./edit__product__form.css"

const EditProductForm = ({setShowModal,product}) => {
    const dispatch = useDispatch()
    console.log(product)
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [image, setImage] = useState(null);
    const [name, setName] = useState(product.product_name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);

    const [errorName, setErrorName] = useState([])
    const [errorDescription, setErrorDescription] = useState([])
    const [errorPrice, setErrorPrice] = useState([])



    // const [editImage, setEditImage] = useState(null);
    // refactor maybe
    const user =useSelector((state)=> state.session.user)

    useEffect(()=>{
        setIsLoaded(true)
    }, [dispatch]);

    const editProduct = async(e) => {
        e.preventDefault()
        const errorNameValidation = []
        const errorDescriptionValidation =[]
        const errorPriceValidation = []
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
            errorPriceValidation.push("Price cannot be negative or 0")

        }
        if(price === null){
            errorPriceValidation.push("Price cannot be negative")

        }

        if (errorNameValidation.length || errorDescriptionValidation.length || errorPriceValidation.length){
            setErrorName(errorNameValidation)
            setErrorDescription(errorDescriptionValidation)
            setErrorPrice(errorPriceValidation)
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
        console.log(data)
        dispatch(updateProduct(data))
        setShowModal(false)
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return(
        isLoaded && (
            <div className="edit__product__container">
                <div className="modal__form__heading">Edit Product Form</div>
                <form onSubmit={editProduct} className="edit__product__form">
                    <div>
                        <label>Product Name</label>
                        {errorName ? <div>{errorName}</div> : <></>}
                        <input className="product__form__input" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Description</label>
                        {errorDescription ? <div>{errorDescription}</div> : <></>}
                        <input className="product__form__input" value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <label>Price</label>
                        {errorPrice ? <div>{errorPrice}</div> : <></>}
                        <input className="product__form__input" type='number' value={price} onChange={e => setPrice(e.target.value)} pattern='[0-9]+(\\.[0-9][0-9]?)?' placeholder="0.00" min="0.00" step="0.01"/>
                    </div>
                    <div className="image__select__container">
                        <label>Change Image if Needed</label>
                        <input className="product__form__input" type ="file" accept="image/*" onChange={updateImage}/>
                    </div>
                    <button className="submit__edit__product__button" type="submit">Submit</button>
                </form>
            </div>
        )
    )
}


export default EditProductForm
