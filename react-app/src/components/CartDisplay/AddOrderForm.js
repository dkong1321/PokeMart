import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getOrders, postOrder, deleteOrder} from "../../store/order"
import {clearCart} from "../../store/cart"
import "./cart_product.css"
const AddOrderForm = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    // Form info
    const [ firstName, setfirstName] = useState("")
    const [ lastName, setlastName] = useState("")
    const [ shipping, setShipping] = useState("")
    const [ city, setCity] = useState("")
    const [ state, setState] = useState("")

    const user = useSelector((state)=> state.session.user)
    const orders = useSelector((state)=> state.orders)
    const cart = useSelector((state)=> state.cart)
    const cartTotal = useSelector((state=>state.cart.cartTotal))

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
        const data={
            shipping_address:shipping,
            first_name:firstName,
            last_name:lastName,
            city,
            state,
            user_id :user.id,
            total_price : getTotal(),
            order_products: cartItems,
        }
        dispatch(postOrder(data)).then(()=>dispatch(clearCart(user.id)))
    }

    return (
        isLoaded && (
            <div>
                <form onSubmit={submitOrder} className="order__inputs__container">
                <div>Shipping Info Order</div>

                    <div className="row__input__container">
                        <div className="sub__input__container" >
                            <label for="fname">First Name</label>
                            <input id="fname" className="order__inputs" value={firstName} onChange={e=> setfirstName(e.target.value)} ></input>
                        </div>
                        <div className="sub__input__container">
                            <label f>Last Name</label>
                            <input id="lname" className="order__inputs" value={lastName} onChange={e=> setlastName(e.target.value)} ></input>
                        </div>
                    </div>
                    <div className="sub__input__container address__input__container" >
                        <label for="address">Address</label>
                        <input id="address" className="order__inputs" value={shipping} onChange={e=> setShipping(e.target.value)}></input>
                    </div>
                    <div className="row__input__container">
                        <div className="sub__input__container">
                            <label for="city">City</label>
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
                    <button type="submit">Submit</button>
                </form>

            </div>
        )
    )
}

export default AddOrderForm
