from app.models import db, User, Product


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo_user1 = User(
        username='Propane Prince', email='propaneprince@aa.io', password='password', avatar_url='http://kanto-prime.s3.amazonaws.com/accce75ebdb1455898d39784580a9f48.jpg' )
    demo_user2 = User(
        username='ChrisCharming', email='christtv@aa.io', password='password', avatar_url='http://kanto-prime.s3.amazonaws.com/accce75ebdb1455898d39784580a9f48.jpg' )
    demo_user3 = User(
        username='DukeSilver', email='pmelhus@aa.io', password='password', avatar_url='http://kanto-prime.s3.amazonaws.com/accce75ebdb1455898d39784580a9f48.jpg' )


    # demo_product1 = Product(
    #     product_name = '', price=00.00, product_image_url="", user_id=1)
    userArr =[demo_user1, demo_user2, demo_user3 ]

    for user in userArr:
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
