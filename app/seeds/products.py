from app.models import db, User, Product, Order, Category, OrderProduct

def seed_products():
    demo_product1 = Product(
        product_name = 'Vaporeon Vmax (SWSH182)', price=5.00, user_id=1,
        description = "Full art Vaporeon card",
        product_image_url="http://kanto-prime.s3.amazonaws.com/da4a15d831414318a48514ce1fca94b6.jpg")

    demo_product2 = Product(
        product_name = 'Charizard Celebrations (4/102)', price=12.00, user_id=1,
        description = "Near mint Charizard from then 25th Celebrations pack",
        product_image_url="http://kanto-prime.s3.amazonaws.com/e81d87b9a97c47f5a41b263b413f9b0a.jpg",)

    demo_product3 = Product(
        product_name = 'Venusaur Celebrations (15/102)', price=8.00,  user_id=1,
        description = "Venusaur ungraded from then 25th Celebrations pack",
        product_image_url="http://kanto-prime.s3.amazonaws.com/e81eebaba0f04841b966a6fbf33814fe.jpg",)

    demo_product4 = Product(
        product_name = 'Blastoise Celebrations (2/102)', price=5.00,  user_id=1,
        description = "Blastoise from then 25th Celebrations pack",
        product_image_url="http://kanto-prime.s3.amazonaws.com/55c9361d5d02408591305c6f16b1bafb.jpg",)

    demo_product5 = Product(
        product_name = 'Pikachu Vmax (SWSH062)', price=12.00,  user_id=1,
        description = "Near min Charizard from then 25th Celebrations pack",
        product_image_url="http://kanto-prime.s3.amazonaws.com/eaddac14a0eb401eb196ecf40a12a3a4.jpg",)

    productArr =[demo_product1, demo_product2, demo_product3, demo_product4, demo_product5]

    for product in productArr:
        db.session.add(product)

    # ===============================================================================================================

    demo_order1 = Order(
        shipping_address="123 Zelma Corners", total_price =15.00, delivered=False, user_id=2,
    )

    demo_order2 = Order(
        shipping_address="555 Kiehn Streets", total_price =15.00, delivered=False, user_id=2,
    )

    demo_order3 = Order(
        shipping_address="333 Market", total_price =25.00, delivered=False, user_id=2,
    )

    orderArr =[demo_order1, demo_order2, demo_order3]

    for order in orderArr:
        db.session.add(order)

    # ===============================================================================================================
    demo_order_product1 = OrderProduct(
        order_id=1, product_id=1, quantity=3,
    )

    demo_order_product2 = OrderProduct(
        order_id=2, product_id=1, quantity=3,
    )

    demo_order_product3 = OrderProduct(
        order_id=3, product_id=1, quantity=2,
    )

    demo_order_product4 = OrderProduct(
        order_id=3, product_id=4, quantity=3,
    )

    orderProductArr = [demo_order_product1, demo_order_product2, demo_order_product3, demo_order_product4]

    for orderProduct in orderProductArr:
        db.session.add(orderProduct)
    # demo_order_product1 = OrderProduct(
    #     order_id=, product_id=, quantity=,
    # )

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
