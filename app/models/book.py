from .db import db, environment, SCHEMA, add_prefix_for_prod

class Book(db.Model):
    __tablename__ = 'books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(50), nullable=False, default='available')
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.now())


    user = db.relationship('User', back_populates='books')


    reviews = db.relationship('Review', backref='book_details', lazy=True, overlaps="book,reviews")

    exchange_requests = db.relationship('ExchangeRequest', back_populates='book')


    @property
    def average_rating(self):
        total_reviews = len(self.reviews)
        if total_reviews == 0:
            return 0
        total_rating = sum([review.rating for review in self.reviews])
        return round(total_rating / total_reviews, 1)

    def to_dict(self):

        if self.user:
            print(f"Book: {self.title}, Owner: {self.user.to_dict()}")  

        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'author': self.author,
            'genre': self.genre,
            'description': self.description,
            'image_url': self.image_url,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'averageRating': self.average_rating,
            'owner': self.user.to_dict() if self.user else None,
            'reviews': [review.to_dict() for review in self.reviews]
        }
