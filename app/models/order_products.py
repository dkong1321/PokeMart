from .db import db

order_products = db.Table(
    "order_products",
    db.Column("order_id", db.Integer, db.ForeignKey("orders.id"), primary_key=True),
    db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True),\
    db.Column("quantity", db.Integer),

    # quantity = db.Column(db.Integer, nullable=False)
)
