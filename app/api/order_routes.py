from calendar import c
from flask import Blueprint, request
from app.forms.order import OrderCreateForm
from app.models import db
from app.models.order import Order
import uuid

order_routes = Blueprint('orders', __name__)

# all orders of a user
@order_routes.route('/<int:userId>')
def all_orders(userId):
    orders = Order.query.filter(Order.user_id == userId)
    print(orders)
    return {"orders" : [order.to_dict() for order in orders]}

@order_routes.route('/', methods=["POST"])
def add_order():
    print("this is the post route \n \n")
    form = OrderCreateForm()
    print("this is the form \n\n", form)
    form['csrf_token'].data = request.cookies['csrf_token']
    print("\n\n")
    print("\n\n")
    print("total_price", form.total_price.data)
    print("shipping_address", form.shipping_address.data)
    print("user_id", form.user_id.data)
    print("\n\n")
    print("\n\n")

    if form.validate_on_submit():

        new_order = Order(
            total_price = form.total_price.data,
            shipping_address = form.shipping_address.data,
            user_id = form.user_id.data,
        )
        print("new_order is here \n \n", new_order)
        db.session.add(new_order)
        db.session.commit()
        return new_order.to_dict()
