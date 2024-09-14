from .db import db, environment, SCHEMA, add_prefix_for_prod

class ExchangeRequest(db.Model):
    __tablename__ = 'exchange_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), nullable=False)
    requester_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    request_date = db.Column(db.DateTime, nullable=False, default=db.func.now())
    due_date = db.Column(db.DateTime, nullable=True)

    # Relationships
    book = db.relationship('Book', back_populates='exchange_requests')
    requester = db.relationship('User', foreign_keys=[requester_id], back_populates='requested_exchanges')
    owner = db.relationship('User', foreign_keys=[owner_id], back_populates='owned_exchanges')

    def to_dict(self):
        return {
        'id': self.id,
        'book_id': self.book_id,
        'status': self.status,
        'requester': {
            'id': self.requester.id,
            'username': self.requester.username,

        },
        'owner': {
            'id': self.owner.id,
            'username': self.owner.username,

        },
        'book': {
            'id': self.book.id,
            'title': self.book.title,
            'author': self.book.author,
            'genre': self.book.genre,
            'image_url': self.book.image_url,  
        },
        'request_date': self.request_date,
        'due_date': self.due_date,
    }
