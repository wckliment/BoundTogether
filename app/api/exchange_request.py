from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, ExchangeRequest, Book  # Ensure Book is imported
from datetime import datetime

exchange_request_routes = Blueprint('exchange_requests', __name__)

# GET all exchange requests for the current user
@exchange_request_routes.route('/')
@login_required
def get_exchange_requests():

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


    if exchange_request.owner_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.json

    if 'status' in data:
        new_status = data['status']
        exchange_request.status = new_status


        if new_status == 'accepted':
            book = exchange_request.book
            book.status = 'borrowed'
        elif new_status == 'completed':
            book = exchange_request.book
            book.status = 'not available'
        elif new_status == 'rejected':
            book = exchange_request.book
            book.status = 'available'

        db.session.commit()
        return exchange_request.to_dict()

    return jsonify({"error": "Invalid request data"}), 400



# POST a new exchange request (optional, if you want to create new requests)
@exchange_request_routes.route('/', methods=['POST'])
@login_required
def create_exchange_request():
    try:
        data = request.json
        print("Received data:", data)


        due_date = datetime.strptime(data['due_date'], '%Y-%m-%d').date() if data.get('due_date') else None

        new_request = ExchangeRequest(
            requester_id=current_user.id,
            owner_id=data['owner_id'],
            book_id=data['book_id'],
            status='pending',
            due_date=due_date
        )

        db.session.add(new_request)
        db.session.commit()

        return new_request.to_dict(), 201
    except Exception as e:
        print("Error creating exchange request:", str(e))  
        return jsonify({"error": str(e)}), 500


    # Delete an exchange request
@exchange_request_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_exchange_request(id):
    exchange_request = ExchangeRequest.query.get(id)

    if not exchange_request:
        return jsonify({"error": "Exchange request not found"}), 404

    if exchange_request.requester_id != current_user.id and exchange_request.owner_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(exchange_request)
    db.session.commit()
    return jsonify({"message": "Exchange request deleted successfully"}), 200
