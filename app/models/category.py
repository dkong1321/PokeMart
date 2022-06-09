from .db import db
from app.models.product_categories import products_categories
class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(255))

    # relationships
    # one to many between product and categories
    products = db.relationship("Product", secondary=products_categories, back_populates="categories")


    def to_dict(self):
        return {
            "id" : self.id,
            "category_name" : self.category_name
        }
