from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, ExchangeRequest, Book  # Ensure Book is imported
from datetime import datetime

exchange_request_routes = Blueprint('exchange_requests', __name__)

# GET all exchange requests for the current user
@exchange_request_routes.route('/')
@login_required
def get_exchange_requests():
    # Get exchange requests where the current user is either the requester or the owner
    requests = ExchangeRequest.query.filter(
        (ExchangeRequest.requester_id == current_user.id) |
        (ExchangeRequest.owner_id == current_user.id)
    ).all()

    return jsonify([request.to_dict() for request in requests])

# PUT (update) exchange request status

@exchange_request_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_exchange_request(id):
    exchange_request = ExchangeRequest.query.get(id)

    if not exchange_request:
        return jsonify({"error": "Exchange request not found"}), 404

    # Only the owner of the book can update the request status
    if exchange_request.owner_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.json
    if 'status' in data:
        exchange_request.status = data['status']

        # Update the book's availability status when the exchange is completed
        if data['status'] == 'completed':
            book = exchange_request.book  # Assuming the relationship exists
            book.status = 'not available'  # Update the book's status in the Book model
            db.session.commit()

        db.session.commit()  # Commit the updated exchange request status
        return exchange_request.to_dict()

    return jsonify({"error": "Invalid request data"}), 400



# POST a new exchange request (optional, if you want to create new requests)
@exchange_request_routes.route('/', methods=['POST'])
@login_required
def create_exchange_request():
    try:
        data = request.json
        print("Received data:", data)  # Debug incoming request data

        # Convert the due_date string to a Python date object
        due_date = datetime.strptime(data['due_date'], '%Y-%m-%d').date() if data.get('due_date') else None

        new_request = ExchangeRequest(
            requester_id=current_user.id,
            owner_id=data['owner_id'],
            book_id=data['book_id'],
            status='pending',
            due_date=due_date  # Save the converted due_date
        )

        db.session.add(new_request)
        db.session.commit()

        return new_request.to_dict(), 201
    except Exception as e:
        print("Error creating exchange request:", str(e))  # Log the error
        return jsonify({"error": str(e)}), 500
