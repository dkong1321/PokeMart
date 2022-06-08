from app.models import db, Review

def seed_reviews():
    demo_review1 = Review(rating=4, description="I love this but the shipping was late",user_id=2, product_id=1)
    demo_review2 = Review(rating=5, description="Great purchase looks amazing",user_id=2, product_id=1)
    demo_review3 = Review(rating=1, description="great purchase looks amazing",user_id=2, product_id=1)

    reviewArr = [demo_review1, demo_review2, demo_review3]

    for review in reviewArr:
        db.session.add(review)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
