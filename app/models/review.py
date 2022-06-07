from .db import db
import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False )
    description = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now())
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # relationships
    # one to many between orders and product
    products = db.relationship("Product", back_populates="reviews")

def to_def(self):
    return {
        "id" : self.id,
        "rating" : self.rating,
        "description" : self.description,
        "timestamp" : self.timestamp,
        "product_id" : self.product_id,
        "user_id" : self.user_id
    }
