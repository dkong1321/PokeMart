from calendar import c
import re
from flask import Blueprint, request
from app.forms.order import OrderCreateForm, OrderEditForm
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
    print(req['total_price'])
    print(req['shipping_address'])
    print(req['user_id'])
    print(req['order_products'])
    print('\n \n')


    # if form.validate_on_submit():

    new_order = Order(
        total_price = req['total_price'],
        shipping_address = req['shipping_address'],
        user_id = req['user_id'],
    )
    # print("new_order is here \n \n", new_order)
    db.session.add(new_order)
    db.session.commit()

    for product in req['order_products']:
        print(new_order.id)
        print(product["id"])
        print(product["product_name"])
        print(product["quantity"])
        order_product = OrderProduct(
            order_id=new_order.id, product_id=product["id"], quantity= product["quantity"]
        )
        db.session.add(order_product)
        db.session.commit()

    return new_order.to_dict()
    # return {"message": "hello"}

# @order_routes.route('/', methods=["POST"])
# def add_order():
#     print("this is the post route \n \n")
#     form = OrderCreateForm()
#     print("this is the form \n\n", form)
#     form['csrf_token'].data = request.cookies['csrf_token']
#     print("\n\n")
#     print("\n\n")
#     print("total_price", form.total_price.data)
#     print("shipping_address", form.shipping_address.data)
#     print("user_id", form.user_id.data)
#     # print("order_products", form.order_products.data)
#     print("\n\n")
#     print("\n\n")

#     # if form.validate_on_submit():

#     new_order = Order(
#         total_price = form.total_price.data,
#         shipping_address = form.shipping_address.data,
#         user_id = form.user_id.data,
#     )
#     print("new_order is here \n \n", new_order)
#     db.session.add(new_order)
#     db.session.commit()
#     return new_order.to_dict()

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
