from flask import Blueprint, request
from app.models import db
from app.models.cart import Cart

cart_routes = Blueprint('carts', __name__)

# all items in cart of a user
@cart_routes.route('/<int:userId>')
def my_cart(userId):
    cart_items = Cart.query.filter(Cart.user_id == userId)
    print(cart_items)
    return {"cart_items": [cart_item.to_dict() for cart_item in cart_items ]}

# post route for a cart item

@cart_routes.route('/', methods=["POST"])
def post_product():

    req = request.json['data']
    print("\n\n", req)

    new_cart_item = Cart(
        user_id =req["user_id"],
        product_id=req["id"],
        quantity=1,
    )
    db.session.add(new_cart_item)
    db.session.commit()

    return new_cart_item.to_dict()

@cart_routes.route('/<int:productId>', methods=["PUT"])
def edit_product(productId):
    req = request.json['data']
    product = Cart.query.filter(Cart.product_id == productId and Cart.user_id == req["cartUserId"]).first()
    print("\n\n req",req)
    print("\n\n", req["cartUserId"])
    print("\n\n product")
    print("\n\n", product)
    print("\n\n",req["quantity"])
    product.quantity = req["quantity"]

    db.session.add(product)
    db.session.commit()
    return product.to_dict()
