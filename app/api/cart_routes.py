from flask import Blueprint, request
from app.models import db
from app.models.cart import Cart

cart_routes = Blueprint('carts', __name__)

# all items in cart of a user
@cart_routes.route('/<int:userId>')
def my_cart(userId):
    print(userId)
    cart_items = Cart.query.filter(Cart.user_id == userId).all()
    print(cart_items)
    return {"cart_items": [cart_item.to_dict() for cart_item in cart_items ]}

# post route for a cart item

@cart_routes.route('/', methods=["POST"])
def post_product():
    print("in the add item route")
    req = request.json['data']
    print("\n\n this is req \n", req)
    print("\n\n")
    new_cart_item = Cart(
        user_id =req["cartUserId"],
        product_id=req["product"]["id"],
        quantity=1,
    )
    db.session.add(new_cart_item)
    db.session.commit()

    return new_cart_item.to_dict()

@cart_routes.route('/<int:productId>', methods=["PUT"])
def edit_product(productId):
    print("\n\nin the increment item route\n\n")
    req = request.json['data']
    cart = Cart.query.filter(Cart.product_id == productId, Cart.user_id == req["cartUserId"]).first()
    print("\n\n req",req)
    print("\n\n", req["cartUserId"])
    print("\n\n product")
    print("\n\n", cart)
    print("\n\n",req["quantity"])
    cart.quantity = req["quantity"]

    db.session.add(cart)
    db.session.commit()
    return cart.to_dict()

@cart_routes.route('/<int:cartUserId>', methods=["DELETE"])
def clear_cart(cartUserId):
    print(cartUserId)
    cart_product = Cart.query.filter( Cart.user_id == cartUserId).all()
    print("\n\n")
    print("\n my cart+product",cart_product)
    print("\n\n")
    for product in cart_product:
        db.session.delete(product)
    # db.session.delete(cart_product)
    db.session.commit()
    return {"message":"deleted cart"}

@cart_routes.route('/<int:cartUserId>/<int:productId>', methods=["DELETE"])
def delete_product(productId, cartUserId):
    print(productId)
    print(cartUserId)
    cart_product = Cart.query.filter(Cart.product_id == productId and Cart.user_id == cartUserId).first()
    print("\n\n line 52", cart_product)
    deleted_cart_product = cart_product.to_dict()
    db.session.delete(cart_product)
    db.session.commit()
    return deleted_cart_product
