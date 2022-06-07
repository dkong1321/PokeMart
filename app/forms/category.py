from unicodedata import category
from flask_wtf import FlaskForm
from wtforms import IntegerField, FloatField, StringField
from wtforms.validators import DataRequired

class CategoryCreateForm(FlaskForm):
    category_name = StringField("Category Name", validators=[DataRequired()])
