from flask_wtf import FlaskForm
from wtforms import IntegerField, FloatField, StringField, FieldList
from wtforms.validators import DataRequired

class OrderCreateForm(FlaskForm):
    total_price = FloatField("Order Price", validators=[DataRequired()])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    shipping_address = StringField("Shipping Address", validators=[DataRequired()])
    # order_products = FieldList(IntegerField("order_products"))
class OrderEditForm(FlaskForm):
    shipping_address = StringField("Shipping Address", validators=[DataRequired()])
