from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired

class ProductCreateForm(FlaskForm):
    product_name = StringField("Product Name", validators=[DataRequired()])
    price = FloatField("Price", validators=[DataRequired()])
    product_image_url = StringField("Image", validators=[DataRequired()])
    user_id = IntegerField("User Id", validators=[DataRequired()])

class ProductEditForm(FlaskForm):
    product_name = StringField("Product Name", validators=[DataRequired()])
    price = FloatField("Price", validators=[DataRequired()])
    product_image_url = StringField("Image", validators=[DataRequired()])
    user_id = IntegerField("User Id", validators=[DataRequired()])
