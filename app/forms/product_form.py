from unicodedata import category
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, FileField
from wtforms.validators import DataRequired

class ProductCreateForm(FlaskForm):
    product_name = StringField("Product Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    price = FloatField("Price", validators=[DataRequired()])
    image = FileField("Image", validators=[DataRequired()])
    user_id = IntegerField("User Id", validators=[DataRequired()])
    category = IntegerField("Category", validators=[DataRequired()])

class ProductEditForm(FlaskForm):
    product_name = StringField("Product Name", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    price = FloatField("Price", validators=[DataRequired()])
    image = FileField("Image")
    user_id = IntegerField("User Id", validators=[DataRequired()])
    category = IntegerField("Category", validators=[DataRequired()])
