from .db import db
import datetime

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(355))
    price = db.Column(db.Float,nullable=False )
    product_image_url = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now())
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), default=5, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # orderProduct relationship
    item_in_order = db.relationship('OrderProduct', back_populates='product', cascade="all, delete-orphan")

    # relationships
    product_cart= db.relationship("Cart", back_populates="product" )

    # one to many between product and reviews
    reviews = db.relationship("Review", back_populates="products", cascade="all, delete-orphan" )

    # one to many between product and categories
    category = db.relationship("Category", back_populates="products")


    def to_dict(self):

        return {
            "id" : self.id,
            "product_name" : self.product_name,
            "description" : self.description,
            "price" : self.price,
            "product_image_url" : self.product_image_url,
            "timestamp" : self.timestamp,
            "user_id" : self.user_id,
            "category_id": self.category_id,
            "reviews" : [review.to_dict() for review in self.reviews]
        }
