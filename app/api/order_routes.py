from flask import Blueprint, request
from app.forms.order import OrderEditForm
from app.models import db
from app.models.order import Order
from app.models.order_products import OrderProduct

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

    req = request.json['data']
    new_order = Order(
        total_price = req['total_price'],
        shipping_address = req['shipping_address'],
        first_name =req["first_name"],
        last_name=req["last_name"],
        city=req["city"],
        state=req["state"],
        user_id = req['user_id'],
        timestamp = req["timestamp"]
    )
    db.session.add(new_order)
    db.session.commit()

    for product in req['order_products']:

        order_product = OrderProduct(
            order_id=new_order.id, product_id=product["product"]["id"], quantity= product["quantity"], product_name=product["product"]["product_name"],
            product_image=product["product"]["product_image_url"]
        )
        db.session.add(order_product)
        db.session.commit()

    return new_order.to_dict()

@order_routes.route('/<int:order_id>', methods=["PUT"])
def edit_order(order_id):
    order = Order.query.get(order_id)
    print("\n\n",request.json)
    req = request.json

    order.shipping_address = req['shipping_address']
    order.first_name =req["first_name"]
    order.last_name=req["last_name"]
    order.city=req["city"]
    order.state=req["state"]

    db.session.add(order)
    db.session.commit()
    return order.to_dict()


@order_routes.route("/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):

    order = Order.query.get(order_id)
    order_deleted = order.to_dict()
    db.session.delete(order)
    db.session.commit()
    return order_deleted
