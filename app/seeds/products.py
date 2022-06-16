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
    demo_product6 = Product(
        product_name = 'Mega Charizard X Statue',
                        price=139.99,  user_id=2,
        description = "DS Studios, estimated height od 20cm. Includes LED light. Limited production of only 380 pieces. Produced by DS Studios",
        product_image_url="http://kanto-prime.s3.amazonaws.com/289fc69b14dc454e874574cc6a7b6b81.png",)
    demo_product7 = Product(
        product_name = 'Slowpoke Poke Plush 59in',
                        price=450.00,  user_id=2,
        description = "We may never know what Slowpoke is thinking—or if it's even thinking at all—but its willingness to happily laze the day away is worthy of admiration. With this jumbo Slowpoke plush by your side at home, school, or work, you'll always have a reminder of the importance of taking it a little slow from time to time",
        product_image_url="http://kanto-prime.s3.amazonaws.com/7e6ac033999244a3b14d5f70efb3ec5c.png",)
    demo_product8 = Product(
        product_name = 'Gyarados Resin Statue',
                        price=149.99,  user_id=1,
        description = "The leap to the Dragon's Door with LED light. Features Magikarp, Squirtle, Gyarados, Corsola. Produced by Crescent Studios",
        product_image_url="http://kanto-prime.s3.amazonaws.com/a62918a317d44dc7898588b9d4ec9da2.png",)
    demo_product9 = Product(
        product_name = 'M Rayquaza EX - 105/108',
                        price=100.00,  user_id=1,
        description = "Ride the winds of battle! Witness the debut of Mega Rayquaza-EX as it prepares to battle Mega Latios-EX and many other Dragon type Pokémon. Rayquaza from XY: Roaring Skies set, released in May 2015",
        product_image_url="http://kanto-prime.s3.amazonaws.com/e77261f456fd4b94b3fd11d93d3efc84.png",)
    demo_product10 = Product(
        product_name = 'Rayquaza V - 194/203',
                        price=99.99,  user_id=1,
        description = "Rayquaza V from Sword and Shield Evolving Skies set, Alternate Art card by artist Ryuta Fuse ",
        product_image_url="http://kanto-prime.s3.amazonaws.com/53fab35c37144653bf677f6fcdd4153e.png",)
    demo_product11 = Product(
        product_name = 'Machamp V - 172/189',
                        price=139.98,  user_id=1,
        description = """Machamp aleternate art card, ultra rare. From Sword and Shield Astral Radiance set. Dimensions are 3.5" H x 2.5" W x 0.012" D """,
        product_image_url="http://kanto-prime.s3.amazonaws.com/63bf68329b4248a3a277ecf2882941fa.png",)
    demo_product12 = Product(
        product_name = 'Nendoroid Trainer Red',
                        price=99.99,  user_id=1,
        description = "You can change Red’s expression—and pose him with 3 powerful Pokémon! Each Pokémon includes battle effects that show off a signature move: Blast Burn for Charizard, Frenzy Plant for Venusaur, and Hydro Cannon for Blastoise!",
        product_image_url="http://kanto-prime.s3.amazonaws.com/1ff46ed10af84c4194a0d148d8643f34.png",)
    demo_product13 = Product(
        product_name = 'Kingdra - Pokemon SWSH10',
                        price=2.98,  user_id=1,
        description = "Kingdra Astral Radiance Card NM condition",
        product_image_url="http://kanto-prime.s3.amazonaws.com/f74f262d5d974fe0b3a96ecadb99f816.png",)
    demo_product14 = Product(
        product_name = 'Charizard Rising Flames',
                        price=249.99,  user_id=1,
        description = "Rising out of the smoke and flames, Charizard unleashes a tremendous Flamethrower attack! Pokémon Center has paired with First 4 Figures to create this stunning figure featuring premium-quality sculpted details and a dazzling LED feature that lights up the raging flames with a warm, beautiful glow. ",
        product_image_url="http://kanto-prime.s3.amazonaws.com/f74f262d5d974fe0b3a96ecadb99f816.png",)


    # demo_product6 = Product(
    #     product_name = 'Pikachu Vmax (SWSH062)', price=12.00,  user_id=1,
    #     description = "Near min Charizard from then 25th Celebrations pack",
    #     product_image_url="http://kanto-prime.s3.amazonaws.com/df80891fa645486d9f6a5b8bd7f97add.png",)


    productArr =[demo_product1, demo_product2, demo_product3, demo_product4, demo_product5, demo_product6, demo_product7, demo_product8, demo_product9, demo_product10, \
                demo_product11, demo_product12, demo_product13, demo_product14,]

    for product in productArr:
        db.session.add(product)

    # ===============================================================================================================

    demo_order1 = Order(
        shipping_address="123 Zelma Corners", total_price =15.00, delivered=False, user_id=1,
        first_name="Propane", last_name="Prince", city="Rockford", state="IL", timestamp="Tue Jun 07 2022 20:33:17 GMT-0700 (Pacific Daylight Time)"
    )

    demo_order2 = Order(
        shipping_address="555 Kiehn Streets", total_price =15.00, delivered=False, user_id=1,
        first_name="Propane", last_name="Prince", city="Chicago", state="IL", timestamp="Tue Jun 07 2022 20:33:17 GMT-0700 (Pacific Daylight Time)"
    )

    demo_order3 = Order(
        shipping_address="333 Market", total_price =25.00, delivered=False, user_id=1,
        first_name="Propane", last_name="Prince", city="San Francisco", state="CA", timestamp="Tue Jun 07 2022 20:33:17 GMT-0700 (Pacific Daylight Time)"
    )

    orderArr =[demo_order1, demo_order2, demo_order3]

    for order in orderArr:
        db.session.add(order)

    # ===============================================================================================================
    demo_order_product1 = OrderProduct(
        order_id=1, product_id=1, quantity=3, product_name='Vaporeon Vmax (SWSH182)',
        product_image= "http://kanto-prime.s3.amazonaws.com/da4a15d831414318a48514ce1fca94b6.jpg"
    )

    demo_order_product2 = OrderProduct(
        order_id=2, product_id=1, quantity=3, product_name='Vaporeon Vmax (SWSH182)',
        product_image= "http://kanto-prime.s3.amazonaws.com/da4a15d831414318a48514ce1fca94b6.jpg"
    )

    demo_order_product3 = OrderProduct(
        order_id=3, product_id=1, quantity=2, product_name='Vaporeon Vmax (SWSH182)',
        product_image= "http://kanto-prime.s3.amazonaws.com/da4a15d831414318a48514ce1fca94b6.jpg"
    )

    demo_order_product4 = OrderProduct(
        order_id=3, product_id=4, quantity=3, product_name='Blastoise Celebrations (2/102)',
        product_image= "http://kanto-prime.s3.amazonaws.com/55c9361d5d02408591305c6f16b1bafb.jpg"
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
