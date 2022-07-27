from .db import db
class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(255), nullable=False)

    products = db.relationship("Product", back_populates="category")
    def to_dict(self):
        return {
            "id" : self.id,
            "category_name" : self.category_name,
        }
