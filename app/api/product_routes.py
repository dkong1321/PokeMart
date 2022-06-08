from flask import Blueprint, request
from app.forms.product_form import ProductCreateForm, ProductEditForm
from app.models.product import Product
from app.models import db
import uuid
product_routes = Blueprint('products', __name__)

#  get all product
@product_routes.route('/')
def all_products():
    products = Product.query.all()

    return [ product.to_dict() for product in products]

# get all products from a user
@product_routes.route('/<int:user_id>')
def user_products(user_id):
    user_products = Product.query.filter(Product.user_id == user_id )

#  get a single product
@product_routes.route('/<int:id>')
def single_product(id):
    product = Product.query.filter(Product.id == id).first()
    return product.to_dict()

#  post route
@product_routes.route('/', methods=["POST"])
def post_product():
    form = ProductCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_product = Product(
            product_name = form.product_name.data,
            description = form.description.data,
            price = form.price.data,
            produce_image_url = form.produce_image_url.data,
            user_id = form.user_id.data
        )

        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict()

@product_routes.route('/<int:id>', methods=["PUT"])
def edit_product(id):
    form = ProductEditForm()
    product = Product.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        product.product_name = form.product_name.data
        product.description = form.description.data
        product.price = form.price.data
        product.product_image_url = form.product_image_url.data

        db.session.add(product)
        db.session.commit()
        return product.to_dict()

@product_routes.route('/<int:id>', methods=["DELETE"])
def delete_product(id):
    product = Product.query.get(id)
    # add something to delete product from all carts but not orders!
    deleted_product = product
    db.session.delete(deleted_product)
    db.session.commit()
    return deleted_product.to_dict()
