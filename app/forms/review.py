from flask import Flask
from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class ReviewCreateForm(FlaskForm):
    rating = IntegerField("Rating", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    product_id = IntegerField("Product Id", validators=[DataRequired()])
    user_id = IntegerField("User Id", validators=[DataRequired()])

class ReviewUpdateForm(FlaskForm):
    rating = IntegerField("Rating", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
