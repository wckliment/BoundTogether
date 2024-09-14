from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, db, Book

review_routes = Blueprint('reviews', __name__)

# Get all reviews for a book
@review_routes.route('/books/<int:book_id>/reviews', methods=['GET'])
def get_reviews_for_book(book_id):
    reviews = Review.query.filter_by(book_id=book_id).all()
    return jsonify([review.to_dict() for review in reviews])

@review_routes.route('/books/<int:book_id>/reviews', methods=['POST'])
@login_required
def create_review(book_id):
    data = request.get_json()

    # Create the review
    review = Review(
        reviewer_id=current_user.id,
        reviewee_id=data['reviewee_id'],
        book_id=book_id,
        rating=data['rating'],
        comment=data.get('comment', '')
    )
    db.session.add(review)
    db.session.commit()

    # Recalculate the average rating for the book
    book = Book.query.get(book_id)
    total_reviews = len(book.reviews)
    total_rating = sum([r.rating for r in book.reviews])

    # Update the book's average rating
    book.averageRating = total_rating / total_reviews if total_reviews > 0 else 0
    db.session.commit()

    # Return the updated book with the new average rating
    return jsonify(book.to_dict()), 201

# Update a review
@review_routes.route('/reviews/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    review = Review.query.get(id)

    if not review:
        return jsonify({"error": "Review not found"}), 404

    data = request.get_json()
    review.rating = data['rating']
    review.comment = data.get('comment', review.comment)

    db.session.commit()

    
    book = Book.query.get(review.book_id)
    total_reviews = len(book.reviews)
    total_rating = sum([review.rating for review in book.reviews])
    book.averageRating = total_rating / total_reviews if total_reviews > 0 else 0
    db.session.commit()

    return jsonify(review.to_dict()), 200
