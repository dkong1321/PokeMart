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

    print("my request \n\n", request.json)
    req = request.json['data']
    print("\n\n line 23", req)
    print(req['total_price'])
    print(req['shipping_address'])
    print(req['user_id'])
    print('\n \n')

    new_order = Order(
        total_price = req['total_price'],
        shipping_address = req['shipping_address'],
        user_id = req['user_id'],
    )
    db.session.add(new_order)
    db.session.commit()

    for product in req['order_products']:
        print(new_order.id)
        # print(product["id"])
        print("\n\n on line 44 \n\n", product)
        print(product["product"]["product_name"])
        print(product["quantity"])
        print(product["product"]["id"])
        print(product["product"]["product_image_url"])

        order_product = OrderProduct(
            order_id=new_order.id, product_id=product["product"]["id"], quantity= product["quantity"], product_name=product["product"]["product_name"],
            product_image=product["product"]["product_image_url"]
        )
        db.session.add(order_product)
        db.session.commit()

    return new_order.to_dict()

@order_routes.route('/<int:order_id>', methods=["PUT"])
def edit_order(order_id):
    print("my request \n\n", request.json)
    order = Order.query.get(order_id)
    form = OrderEditForm()
    print(form.data)
    print("\n \n", order)
    print("\n \n", form.shipping_address.data )
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        order.shipping_address = form.shipping_address.data
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
