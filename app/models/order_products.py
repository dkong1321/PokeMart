from .db import db

class OrderProduct(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    # relationships

    order = db.relationship('Order', back_populates='products')
    product = db.relationship('Product', back_populates='item_in_order')

    def to_dict(self):
        return {
            "id":self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "product" : self.product.to_dict()
        }
# =============== Regular join table old =====================
# order_products = db.Table(
#     "order_products",
#     db.Column("order_id", db.Integer, db.ForeignKey("orders.id"), primary_key=True),
#     db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True),\
#     db.Column("quantity", db.Integer),

#     # quantity = db.Column(db.Integer, nullable=False)
# )
