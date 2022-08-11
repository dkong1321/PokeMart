from app.models import db, Review

def seed_reviews():
    demo_review1 = Review(rating=4, description="I love this but the shipping was late",user_id=2, product_id=1)
    demo_review2 = Review(rating=5, description="Great purchase looks amazing",user_id=3, product_id=1)
    demo_review3 = Review(rating=1, description="Arrived late for me and was damaged",user_id=5, product_id=1)
    demo_review4 = Review(rating=2, description="Not worth the price IMO",user_id=3, product_id=2)
    demo_review5 = Review(rating=4, description="Got it as a gift for my uncle and he loves displaying it in his office",user_id=2, product_id=2)
    demo_review6 = Review(rating=5, description="I love this card so nostalgic. Came on time with no issues.",user_id=5, product_id=2)
    demo_review7 = Review(rating=4, description="Arrived damaged looks like someone stepped on the book. Returned with no issues though and I love my new card",user_id=4, product_id=2)
    demo_review8 = Review(rating=5, description="Card was lost in transit but the store owner sent another!",user_id=3, product_id=2)
    demo_review9 = Review(rating=5, description="The great quality product!",user_id=1, product_id=6)
    demo_review10 = Review(rating=3, description="Nice statue really brightens my room!",user_id=5, product_id=6)
    demo_review11 = Review(rating=4, description="The details are great, amazing workmanship! ",user_id=1, product_id=6)
    demo_review12 = Review(rating=3, description="I love Charizard so much this fits great in my room",user_id=2, product_id=6)
    demo_review13 = Review(rating=4, description="Such a fluffy stuffed animal! I love having this on my couch",user_id=2, product_id=7)
    demo_review14 = Review(rating=5, description="This things is huge! Worth the money!",user_id=3, product_id=7)
    demo_review15 = Review(rating=2, description="The stuffings already come out! Not worth!",user_id=4, product_id=7)
    demo_review16 = Review(rating=1, description="Sent the wrong item to me such a pain",user_id=2, product_id=7)
    demo_review17 = Review(rating=5, description="I love this Rayquaza card such a good item! ",user_id=5, product_id=9)
    demo_review18 = Review(rating=5, description="Good quality card came on time with no issues!",user_id=3, product_id=9)
    demo_review19 = Review(rating=1, description="Way too expensive you can get this cheaper else where",user_id=5, product_id=9)
    demo_review20 = Review(rating=5, description="I love this alt art card such a cool design!",user_id=3, product_id=11)
    demo_review21 = Review(rating=5, description="Def worth the price I love this card!",user_id=2, product_id=11)
    demo_review22 = Review(rating=5, description="I love Nendroid figures and this one is exceptionally good",user_id=5, product_id=12)
    demo_review23 = Review(rating=4, description="Such a good item to add to my collection!",user_id=4, product_id=12)
    demo_review24 = Review(rating=5, description="This game was my childhood I'm so glad I was able to get my hands on this game",user_id=3, product_id=29)
    demo_review25 = Review(rating=3, description="This game is no original but a fake copy but for the price its fine",user_id=1, product_id=29)
    demo_review26 = Review(rating=5, description="I had such nostalgia playing this game. I think if anyone wants the original game they should buy this!",user_id=5, product_id=1)
    demo_review27 = Review(rating=2, description="Sent me the wrong version had to return it but I got it in the end.",user_id=1, product_id=29)
    demo_review28 = Review(rating=5, description="Got this for my daugther and she loves this",user_id=2, product_id=32)
    demo_review29 = Review(rating=3, description="Such a good price for a quality item!",user_id=2, product_id=32)
    demo_review30 = Review(rating=5, description="I love this doll!!",user_id=3, product_id=25)
    demo_review31 = Review(rating=1, description="Such a nice find! Glad I found this",user_id=4, product_id=25)
    demo_review32 = Review(rating=5, description="Great purchase looks amazing",user_id=2, product_id=24)
    demo_review33 = Review(rating=1, description="Solid buy no issues with delivery came right on time!",user_id=5, product_id=24)

    reviewArr = [demo_review1, demo_review2, demo_review3, demo_review4, demo_review5, demo_review6, demo_review1, demo_review7, demo_review8, demo_review9, demo_review10, \
                 demo_review11, demo_review12, demo_review13, demo_review14, demo_review15, demo_review16, demo_review11, demo_review17, demo_review18, demo_review19, demo_review20, \
                 demo_review21, demo_review22, demo_review23, demo_review24, demo_review25, demo_review26, demo_review21, demo_review27, demo_review28, demo_review29, demo_review30, \
                 demo_review31, demo_review32, demo_review33
                ]

    for review in reviewArr:
        db.session.add(review)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
