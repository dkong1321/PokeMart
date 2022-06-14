# from flask import
from flask import Blueprint, request
from app.forms.review_form import ReviewCreateForm, ReviewEditForm
from app.models.review import Review
from app.models import db
import uuid
review_routes = Blueprint('reviews', __name__)

# get all reviews
@review_routes.route('/')
def all_reviews():
    reviews = Review.query.all()
    return [ review.to_dict() for review in reviews]

# get all reviews of a user
@review_routes.route('/<int:userId>/')
def user_reviews(userId):
    reviews = Review.query.filter(Review.user_id == userId)
    return {"reviews":[review.to_dict() for review in reviews]}

# post a review
@review_routes.route('/', methods=["POST"])
def post_review():
    form = ReviewCreateForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("got into the validate")
        new_review = Review(
            rating = form.rating.data,
            description = form.description.data,
            product_id = form.product_id.data,
            user_id = form.user_id.data
        )

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()

# edit a review
@review_routes.route("/<int:id>", methods=["PUT"])
def edit_review(id):
    print(id)
    form = ReviewEditForm()
    review = Review.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        review.rating = form.rating.data
        review.description = form.description.data

        db.session.add(review)
        db.session.commit()
        return review.to_dict()

@review_routes.route("/<int:id>", methods=["DELETE"])
def delete_review(id):
    review = Review.query.get(id)
    deleted_review = review
    db.session.delete(review)
    db.session.commit()
    return deleted_review.to_dict()
