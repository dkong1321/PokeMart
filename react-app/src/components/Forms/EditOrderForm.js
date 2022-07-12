import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {editOrder} from "../../store/order"

const EditOrderForm = ({setShowModal, order}) => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ firstName, setfirstName] = useState(order.first_name)
    const [ lastName, setlastName] = useState(order.last_name)
    const [ shipping, setShipping] = useState(order.shipping_address)
    const [ city, setCity] = useState(order.city)
    const [ state, setState] = useState(order.state)

    const [firstNameError, setFirstNameError] =useState([])
    const [lastNameError, setLastNameError] =useState([])
    const [shippingError, setShippingError] =useState([])
    const [cityError, setCityError] =useState([])


    const user = useSelector((state)=> state.session.user)

    useEffect(()=>{
        setIsLoaded(true)
    }, [dispatch, user.id])


    const editShippingOrder = (e) => {
        e.preventDefault()
        const order_id = order.id
        const firstNameErrorValidation = []
        const lastNameErrorValidation = []
        const shippingErrorValidation = []
        const cityErrorValidation = []

        if(!firstName.length || firstName.trim().length===0){
            firstNameErrorValidation.push("First name cannot be empty")
        }
        if(firstName.length>40){
            firstNameErrorValidation.push("First name cannot be more than 40 characters")
        }
        if(!lastName.length || lastName.trim().length===0){
            lastNameErrorValidation.push("Last name cannot be empty")
        }
        if(lastName.length>40){
            lastNameErrorValidation.push("Last name cannot be more than 40 characters")
        }
        if(!shipping.length || shipping.trim().length===0){
            shippingErrorValidation.push("Shipping address cannot be empty")
        }
        if(shipping.length>40){
            shippingErrorValidation.push("Shipping address cannot be more than 40 characters")
        }
        if(!city.length || city.trim().length===0) {
            cityErrorValidation.push("City cannot be empty")
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

        const data={
            shipping_address:shipping,
            first_name:firstName,
            last_name:lastName,
            city,
            state,
            user_id :user.id,
            order_id
        }

        dispatch(editOrder(data))
        setShowModal(false)
    }


    return (
        isLoaded && (
                <form className="edit__order__container" onSubmit={editShippingOrder}>
                    <div className='modal__form__heading'>Edit Order</div>
                    <div className="row__input__container">
                        <div className="sub__input__container" >
                            <label htmlFor="fname" className="input__label">First Name</label>
                            {firstNameError ? <div className="input__error">{firstNameError}</div> : <></>}
                            <input id="fname" className="order__inputs" value={firstName} onChange={e=> setfirstName(e.target.value)} ></input>
                        </div>
                        <div className="sub__input__container">
                            <label htmlFor="lname" className="input__label">Last Name</label>
                            {lastNameError ? <div className="input__error">{lastNameError}</div> : <></>}
                            <input id="lname" className="order__inputs" value={lastName} onChange={e=> setlastName(e.target.value)} ></input>
                        </div>
                    </div>
                    <div className="sub__input__container address__input__container" >
                        <label htmlFor="address" className="input__label">Address</label>
                        {shippingError ? <div className="input__error">{shippingError}</div> : <></>}
                        <input id="address" className="order__inputs" value={shipping} onChange={e=> setShipping(e.target.value)}></input>
                    </div>
                    <div className="row__input__container">
                        <div className="sub__input__container">
                            <label htmlFor="city" className="input__label">City</label>
                            {cityError ? <div className="input__error">{cityError}</div> : <></>}
                            <input id="city" className="order__inputs" value={city} onChange={e=> setCity(e.target.value)} ></input>
                        </div>
                        <div className="sub__input__container">
                            <label htmlFor="state" className="input__label">State</label>
                            {cityError ? <div className="input__error"></div> : <></>}
                            <select id="state" value={state} className="order__select__input" onChange={e=>setState(e.target.value)}>
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
                    <button className="confirm__order__button" type="submit">Submit Order</button>


                </form>

        )
    )
}

export default EditOrderForm
