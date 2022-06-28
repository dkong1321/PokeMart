from app.models import db, Category

def seed_categories():
    demo_cat1 = Category(category_name="new")
    demo_cat2 = Category(category_name="used")
    demo_cat3 = Category(category_name="cards")
    demo_cat4 = Category(category_name="toys")

    catArr =[demo_cat1, demo_cat2, demo_cat3, demo_cat4 ]

    for cat in catArr:
        db.session.add(cat)

    db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
