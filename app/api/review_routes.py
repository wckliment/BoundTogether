from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, db

review_routes = Blueprint('reviews', __name__)

# Get all reviews for a book
@review_routes.route('/books/<int:book_id>/reviews', methods=['GET'])
def get_reviews_for_book(book_id):
    reviews = Review.query.filter_by(book_id=book_id).all()
    return jsonify([review.to_dict() for review in reviews])

# Create a review
@review_routes.route('/books/<int:book_id>/reviews', methods=['POST'])
@login_required
def create_review(book_id):
    data = request.get_json()
    review = Review(
        reviewer_id=current_user.id,
        reviewee_id=data['reviewee_id'],
        book_id=book_id,
        rating=data['rating'],
        comment=data.get('comment', '')
    )
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201

# Update a review
@review_routes.route('/reviews/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    review = Review.query.get(id)
    if review.reviewer_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    review.rating = data['rating']
    review.comment = data.get('comment', review.comment)
    db.session.commit()
    return jsonify(review.to_dict())

# Delete a review
@review_routes.route('/reviews/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if review.reviewer_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted"}), 200
