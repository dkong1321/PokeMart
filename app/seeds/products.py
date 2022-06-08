from app.models import db, User, Product, Order, Category

def seed_products():
    demo_product1 = Product(
        product_name = 'Salamence Card 109/203 ', price=5.00, product_image_url="", user_id=1)

    demo_product2 = Product(
        product_name = 'Jumpluff Card 004/203', price=12.00, product_image_url="", user_id=1)

    demo_product3 = Product(
        product_name = 'Flying Pikachu V 006/025', price=8.00, product_image_url="", user_id=1)

    demo_product4 = Product(
        product_name = 'Lugia 022/025', price=5.00, product_image_url="", user_id=1)

    demo_product5 = Product(
        product_name = 'Ho-Oh 001/025', price=12.00, product_image_url="", user_id=1)

    productArr =[demo_product1, demo_product2, demo_product3, demo_product4, demo_product5]

    for product in productArr:
        db.session.add(product)

    # ===============================================================================================================

    demo_order1 = Order(
        shipping_address="123 Zelma Corners", total_price =15.00, delivered=False, user_id=2, products=[demo_product1]
    )

    demo_order2 = Order(
        shipping_address="555 Kiehn Streets", total_price =15.00, delivered=False, user_id=2, products=[demo_product1]
    )

    demo_order3 = Order(
        shipping_address="333 Market", total_price =25.00, delivered=False, user_id=2, products=[demo_product3]
    )

    orderArr =[demo_order1, demo_order2, demo_order3]

    for order in orderArr:
        db.session.add(order)

    # ===============================================================================================================

    demo_cat1 = Category(category_name="new", products= [demo_product1, demo_product2])
    demo_cat2 = Category(category_name="used")
    demo_cat3 = Category(category_name="cards", products= [demo_product1, demo_product2, demo_product3, demo_product4, demo_product5, ])
    demo_cat4 = Category(category_name="toys")

    catArr =[demo_cat1, demo_cat2, demo_cat3, demo_cat4 ]

    for cat in catArr:
        db.session.add(cat)

    db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
