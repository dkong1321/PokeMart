from flask_wtf import FlaskForm
from wtforms import IntegerField, FloatField, StringField
from wtforms.validators import DataRequired

class OrderCreateForm(FlaskForm):
    total_price = FloatField("Order Price", validators=[DataRequired()])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    shipping_address = StringField("Shipping Address", validator=[DataRequired()])

class OrderEditForm(FlaskForm):
    # total_price = FloatField("Order Price", validators=[DataRequired()])
    # user_id = IntegerField("UserId", validators=[DataRequired()])
    shipping_address = StringField("Shipping Address", validator=[DataRequired()])
