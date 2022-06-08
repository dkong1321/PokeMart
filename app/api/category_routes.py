from unicodedata import category
from flask import Blueprint, request
from app.forms.category_form import CategoryCreateForm
from app.models.category import Category
from app.models import db

category_routes = Blueprint('categories', __name__)

# get all categories
@category_routes.route('/')
def all_categories():
    categories = Category.query.all()
    return [ category.to_dict() for category in categories]

# get a specific category (lazy load its products)
@category_routes.route('/<int:id>')
def single_category(id):
    category = Category.query.filter(Category.id == id).first()
    return category.to_dict()
