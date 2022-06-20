import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getOrders, postOrder} from "../../store/order"
import {clearCart} from "../../store/cart"
import { useHistory } from "react-router-dom";
import "./cart_product.css"
const AddOrderForm = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    // Form info
    const [ firstName, setfirstName] = useState("")
    const [ lastName, setlastName] = useState("")
    const [ shipping, setShipping] = useState("")
    const [ city, setCity] = useState("")
    const [ state, setState] = useState("AL")

    const [firstNameError, setFirstNameError] =useState([])
    const [lastNameError, setLastNameError] =useState([])
    const [shippingError, setShippingError] =useState([])
    const [cityError, setCityError] =useState([])

    const user = useSelector((state)=> state.session.user)
    const cart = useSelector((state)=> state.cart)
    const cartTotal = useSelector((state=>state.cart.cartTotal))
    const history = useHistory()
    useEffect(()=>{
        dispatch(getOrders(user.id)).then(()=>setIsLoaded(true))
        // warning
    }, [dispatch])

    const getTotal = () =>{
        const initalVal = 0
        const myCartTotal = Object.values(cartTotal).reduce(
            (accum,curr) => accum+curr,
            initalVal
        )
        return myCartTotal
    }

    const submitOrder = (e) => {
        e.preventDefault()
        const cartItems = Object.values(cart.products)
        const cartItemQty = Object.values(cart.count)
        for (let i=0; i<cartItems.length; i++) {
            cartItems[i].quantity=cartItemQty[i]
        }

        const firstNameErrorValidation = []
        const lastNameErrorValidation = []
        const shippingErrorValidation = []
        const cityErrorValidation = []

        if(!firstName.length || firstName.trim().length===0){
            firstNameErrorValidation.push("First name is required")
        }
        if(firstName.length>40){
            firstNameErrorValidation.push("First name cannot be more than 40 characters")
        }
        if(!lastName.length || lastName.trim().length===0){
            lastNameErrorValidation.push("Last name is required")
        }
        if(lastName.length>40){
            lastNameErrorValidation.push("Last name cannot be more than 40 characters")
        }
        if(!shipping.length || shipping.trim().length===0){
            shippingErrorValidation.push("Shipping address is required")
        }
        if(shipping.length>40){
            shippingErrorValidation.push("Shipping address cannot be more than 40 characters")
        }
        if(!city.length || city.trim().length===0) {
            cityErrorValidation.push("City is required")
        }
        if(city.length > 30) {
            cityErrorValidation.push("City cannot be more than 20 characters")
        }
        if(firstNameErrorValidation.length || lastNameErrorValidation.length || shippingErrorValidation.length || cityErrorValidation.length ) {
            setFirstNameError(firstNameErrorValidation)
            setLastNameError(lastNameErrorValidation)
            setShippingError(shippingErrorValidation)
            setCityError(cityErrorValidation)
            return
        }
        const timestamp = new Date()
        const data={
            shipping_address:shipping,
            first_name:firstName,
            last_name:lastName,
            city,
            state,
            user_id :user.id,
            total_price : getTotal(),
            order_products: cartItems,
            timestamp: timestamp.toString()
        }
        dispatch(postOrder(data))
        dispatch(clearCart(user.id))
        .then(()=>history.push("/myorders"))
    }

    return (
        isLoaded && (
            <div>
                <form onSubmit={submitOrder} className="order__inputs__container">
                <div>Shipping Info Order</div>

                    <div className="row__input__container">
                        <div className="sub__input__container" >
                            <label for="fname">First Name</label>
                            {firstNameError ? <div>{firstNameError}</div> : <></>}
                            <input id="fname" className="order__inputs" value={firstName} onChange={e=> setfirstName(e.target.value)} ></input>
                        </div>
                        <div className="sub__input__container">
                            <label f>Last Name</label>
                            {lastNameError ? <div>{lastNameError}</div> : <></>}
                            <input id="lname" className="order__inputs" value={lastName} onChange={e=> setlastName(e.target.value)} ></input>
                        </div>
                    </div>
                    <div className="sub__input__container address__input__container" >
                        <label for="address">Address</label>
                        {shippingError ? <div>{shippingError}</div> : <></>}
                        <input id="address" className="order__inputs" value={shipping} onChange={e=> setShipping(e.target.value)}></input>
                    </div>
                    <div className="row__input__container">
                        <div className="sub__input__container">
                            <label for="city">City</label>
                            {cityError ? <div>{cityError}</div> : <></>}
                            <input id="city" className="order__inputs" value={city} onChange={e=> setCity(e.target.value)} ></input>
                        </div>
                        <div className="sub__input__container">
                            <label for="state">State</label>
                            <select id="state" className="order__select__input" onChange={e=>setState(e.target.value)}>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>

                    </div>
                    <button className="confirm__order__button" type="submit">Confirm and Submit Order</button>
                </form>

            </div>
        )
    )
}

export default AddOrderForm
