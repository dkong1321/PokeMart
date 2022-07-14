import { useDispatch } from "react-redux";
import {deleteOrder} from "../../store/order"

import "./delete__product__form.css"

const DeleteOrderForm = ({setShowModal, order}) => {
    const dispatch = useDispatch()

    const cancelOrder = (order) => {
        const order_id = order.id
        dispatch(deleteOrder(order_id))
    }

    const cancelDelete = (e) => {
        setShowModal(false)
    }

    return(
        <div className="delete__confirm__form">
            <h3>Are you sure you want to delete this order?</h3>
            <div>This process cannot be undone</div>
            <div className="delete__product__button__container">
                <button className="delete__product__button" onClick={()=>cancelOrder(order)}>Delete</button>
                <button className="cancel__button" onClick={(e)=>cancelDelete(e)}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteOrderForm
