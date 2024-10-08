from flask.cli import AppGroup
from .users import seed_users, undo_users
from .books import seed_books, undo_books
from .reviews import seed_reviews, undo_reviews
from .exchange_requests import seed_exchange_requests, undo_exchange_requests

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        undo_books()
        undo_reviews()
        undo_exchange_requests()

    seed_users()
    seed_books()
    seed_reviews()
    seed_exchange_requests()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_books()
    undo_reviews()
    undo_exchange_requests()
