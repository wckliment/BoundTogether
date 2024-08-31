from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Book, db

book_routes = Blueprint('books', __name__)

@book_routes.route('/user', methods=['GET'])
@login_required
def get_user_books():
    """
    Get all books belonging to the current user.
    """
    user_books = Book.query.filter_by(user_id=current_user.id).all()
    return jsonify([book.to_dict() for book in user_books])

@book_routes.route('/', methods=['POST'])
@login_required
def add_book():
    """
    Add a new book to the user's personal library.
    """
    data = request.get_json()
    new_book = Book(
        user_id=current_user.id,
        title=data['title'],
        author=data['author'],
        genre=data['genre'],
        description=data.get('description', ''),
        image_url=data.get('image_url', ''),
        status=data.get('status', 'available')
    )
    db.session.add(new_book)
    db.session.commit()
    return jsonify(new_book.to_dict()), 201

@book_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_book(id):
    """
    Update details of a specific book in the user's library.
    """
    book = Book.query.get_or_404(id)

    if book.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    book.title = data['title']
    book.author = data['author']
    book.genre = data['genre']
    book.description = data.get('description', book.description)
    book.image_url = data.get('image_url', book.image_url)
    book.status = data.get('status', book.status)

    db.session.commit()
    return jsonify(book.to_dict())

@book_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_book(id):
    """
    Delete a specific book from the user's library.
    """
    book = Book.query.get_or_404(id)

    if book.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "Book deleted successfully"}), 200

@book_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_book(id):
    """
    Get details of a specific book by ID.
    """
    book = Book.query.get_or_404(id)

    if book.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    return jsonify(book.to_dict())

@book_routes.route('/search', methods=['GET'])
@login_required
def search_books():
    """
    Search books by title, author, or genre.
    """
    query = request.args.get('query', '')
    books = Book.query.filter(
        (Book.title.ilike(f'%{query}%')) |
        (Book.author.ilike(f'%{query}%')) |
        (Book.genre.ilike(f'%{query}%'))
    ).filter_by(user_id=current_user.id).all()

    return jsonify([book.to_dict() for book in books])
