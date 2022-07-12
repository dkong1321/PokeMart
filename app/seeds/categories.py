from app.models import db, Category

def seed_categories():
    demo_cat1 = Category(category_name="none")
    demo_cat2 = Category(category_name="card")
    demo_cat3 = Category(category_name="figure")
    demo_cat4 = Category(category_name="game")
    demo_cat5 = Category(category_name="plush")


    catArr =[demo_cat1, demo_cat2, demo_cat3, demo_cat4, demo_cat5 ]

    for cat in catArr:
        db.session.add(cat)

    db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
