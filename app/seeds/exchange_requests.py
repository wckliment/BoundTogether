from app.models import db, ExchangeRequest
from sqlalchemy.sql import text
from datetime import datetime, timedelta

def seed_exchange_requests():
    request1 = ExchangeRequest(
        requester_id=1,  # user who is requesting
        owner_id=2,      # owner of the book
        book_id=3,       # book being requested
        status="pending", # status of the request
        request_date=datetime.now(), # current time as request date
        due_date=datetime.now() + timedelta(days=14) # due in 14 days
    )

    request2 = ExchangeRequest(
        requester_id=2,
        owner_id=1,
        book_id=4,
        status="accepted",
        request_date=datetime.now(),
        due_date=datetime.now() + timedelta(days=7) # due in 7 days
    )

    request3 = ExchangeRequest(
        requester_id=3,
        owner_id=4,
        book_id=2,
        status="rejected",
        request_date=datetime.now(),
        due_date=None  # no due date for rejected requests
    )

    request4 = ExchangeRequest(
        requester_id=5,
        owner_id=2,
        book_id=6,
        status="pending",
        request_date=datetime.now(),
        due_date=datetime.now() + timedelta(days=21) # due in 21 days
    )

    request5 = ExchangeRequest(
        requester_id=4,
        owner_id=5,
        book_id=7,
        status="completed",
        request_date=datetime.now(),
        due_date=datetime.now() + timedelta(days=30) # due in 30 days
    )

    # Add all the requests to the session
    db.session.add(request1)
    db.session.add(request2)
    db.session.add(request3)
    db.session.add(request4)
    db.session.add(request5)

    # Commit the changes
    db.session.commit()

def undo_exchange_requests():
    db.session.execute('TRUNCATE exchange_requests RESTART IDENTITY CASCADE;')
    db.session.commit()
