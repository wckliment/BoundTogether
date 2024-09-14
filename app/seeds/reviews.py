from app.models import db, Review, environment, SCHEMA 
from sqlalchemy.sql import text

def seed_reviews():
    reviews = [
        # Reviews for User 1's books
        Review(reviewer_id=2, reviewee_id=1, book_id=1, rating=5,
               comment="A timeless classic with a gripping storyline."),
        Review(reviewer_id=3, reviewee_id=1, book_id=3, rating=4,
               comment="Loved the characters and the world-building."),
        Review(reviewer_id=4, reviewee_id=1, book_id=5, rating=3,
               comment="A bit slow, but the plot picks up after a while."),
        Review(reviewer_id=5, reviewee_id=1, book_id=7, rating=5,
               comment="Incredibly well-written and engaging."),

        # Reviews for User 2's books
        Review(reviewer_id=1, reviewee_id=2, book_id=17, rating=5,
               comment="A must-read for any dystopian fiction fan."),
        Review(reviewer_id=3, reviewee_id=2, book_id=18, rating=4,
               comment="A compelling and thought-provoking book."),
        Review(reviewer_id=4, reviewee_id=2, book_id=21, rating=5,
               comment="Fascinating world-building and a strong protagonist."),
        Review(reviewer_id=5, reviewee_id=2, book_id=23, rating=3,
               comment="Not as good as I expected, but still worth reading."),

        # Reviews for User 3's books
        Review(reviewer_id=1, reviewee_id=3, book_id=32, rating=5,
               comment="An emotional journey, beautifully written."),
        Review(reviewer_id=2, reviewee_id=3, book_id=34, rating=4,
               comment="Great book, although some parts felt a bit rushed."),
        Review(reviewer_id=4, reviewee_id=3, book_id=36, rating=5,
               comment="This book left a lasting impression on me."),
        Review(reviewer_id=5, reviewee_id=3, book_id=39, rating=4,
               comment="A profound and thought-provoking read."),

        # Reviews for User 4's books
        Review(reviewer_id=1, reviewee_id=4, book_id=41, rating=4,
               comment="An epic journey filled with adventure and wisdom."),
        Review(reviewer_id=2, reviewee_id=4, book_id=44, rating=5,
               comment="A highly engaging and masterfully written book."),
        Review(reviewer_id=3, reviewee_id=4, book_id=46, rating=3,
               comment="Some parts were a bit dull, but overall a good read."),

        # Reviews for User 5's books
        Review(reviewer_id=1, reviewee_id=5, book_id=50, rating=5,
               comment="A fascinating exploration of human nature."),
        Review(reviewer_id=2, reviewee_id=5, book_id=53, rating=4,
               comment="A classic for a reason, definitely worth reading."),
        Review(reviewer_id=4, reviewee_id=5, book_id=56, rating=5,
               comment="A remarkable piece of literature that stands the test of time."),
    ]

    db.session.add_all(reviews)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
