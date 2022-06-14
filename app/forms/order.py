from flask_wtf import FlaskForm
from wtforms import IntegerField, FloatField, StringField, FieldList
from wtforms.validators import DataRequired

class OrderCreateForm(FlaskForm):
    total_price = FloatField("Order Price", validators=[DataRequired()])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    shipping_address = StringField("Shipping Address", validators=[DataRequired()])
    city = StringField("City", validators=[DataRequired()])
    state = StringField("State", validators=[DataRequired()])

class OrderEditForm(FlaskForm):
    shipping_address = StringField("Shipping Address", validators=[DataRequired()])
