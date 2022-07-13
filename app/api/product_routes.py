from unicodedata import category
from flask import Blueprint, request
from app.forms.product_form import ProductCreateForm, ProductEditForm
from app.models.product import Product
from app.models import db
from app.api.aws_s3_bucket import (upload_file_to_s3, allowed_file, get_unique_filename)
import uuid
product_routes = Blueprint('products', __name__)


#  get all product
@product_routes.route('/')
def all_products():
    products = Product.query.all()

    return {"products" : [ product.to_dict() for product in products]}

# get products by category
@product_routes.route('/category/<int:id>')
def cat_products(id):
    products = Product.query.filter(Product.category_id==id).all()
    return {"products" : [ product.to_dict() for product in products]}


#  get a single product
@product_routes.route('/<int:id>/')
def single_product(id):
    product = Product.query.filter(Product.id == id).first()
    return product.to_dict()

#  post route
@product_routes.route('/', methods=["POST"])
def post_product():
    form = ProductCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("we are in the post route")
    if form.validate_on_submit():
        # image upload <-------------------------->
        if request.files:
            image = request.files["image"]
            if not allowed_file(image.filename):
                return {"errors":"file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)
            # check if upload worked
            if "url" not in upload:
                return upload, 400

            url = upload["url"]
        else:
            url =None
        # image upload <-------------------------->
        print("============")
        print("form", form)
        print(form.category.data)
        print(type(form.category.data))

        print("============")

        new_product = Product(
            product_name = form.product_name.data,
            description = form.description.data,
            price = form.price.data,
            product_image_url = url,
            user_id = form.user_id.data,
            category_id=form.category.data
        )

        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict()
    # return {}

@product_routes.route('/<int:id>', methods=["PUT"])
def edit_product(id):
    form = ProductEditForm()
    product = Product.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    print("===========")
    print(form.category.data)
    print("in the put route hello!")
    if form.validate_on_submit():
        # image upload <-------------------------->
        if request.files:
            image = request.files["image"]
            if not allowed_file(image.filename):
                return {"errors":"file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)
            # check if upload worked
            if "url" not in upload:
                return upload, 400

            url = upload["url"]
        else:
            url =product.product_image_url
        # image upload <-------------------------->
        print("===========")
        print(form)
        print(form.category.data)
        print("===========")

        product.product_name = form.product_name.data
        product.description = form.description.data
        product.price = form.price.data
        product.product_image_url = url
        product.category_id = form.category.data

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
