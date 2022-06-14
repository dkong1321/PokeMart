from .db import db
import datetime
# from app.models.order_products import order_products

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Float,nullable=False )
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now())
    delivered = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    shipping_address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)



    # orderProduct relationship
    products = db.relationship('OrderProduct', back_populates='order', cascade="all, delete-orphan")


    # relationships
    # many to many between orders and product
    # products = db.relationship("Product", secondary=order_products, back_populates="orders")

    def to_dict(self):

        return {
            "id" : self.id,
            "total_price" : self.total_price,
            "timestamp" : self.timestamp,
            "delivered" : self.delivered,
            "user_id" : self.user_id,
            "products" : [product.to_dict() for product in self.products],
            "first_name" : self.first_name,
            "last_name" : self.last_name,
            "shipping_address" : self.shipping_address,
            "city": self.city,
            "state": self.state,
        }
