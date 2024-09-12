from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    books = db.relationship('Book', back_populates='user', cascade='all, delete-orphan')

    requested_exchanges = db.relationship('ExchangeRequest', foreign_keys='ExchangeRequest.requester_id', back_populates='requester')

    owned_exchanges = db.relationship('ExchangeRequest', foreign_keys='ExchangeRequest.owner_id', back_populates='owner')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self, include_books=False):
        user_dict = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }

        if include_books:
            user_dict['books'] = [book.to_dict() for book in self.books]

        return user_dict
