from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text

def seed_books():
    book1 = Book(
        user_id=1,
        title='The Great Gatsby',
        author='F. Scott Fitzgerald',
        genre='Fiction',
        description='A novel set in the Roaring Twenties.',
        image_url='https://covers.openlibrary.org/b/id/12364437-L.jpg',
        status='available'
    )
    book2 = Book(
        user_id=2,
        title='1984',
        author='George Orwell',
        genre='Dystopian',
        description='A novel about totalitarianism and surveillance.',
        image_url='https://ia800505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_91.zip&file=0012919048-M.jpg',
        status='available'
    )
    book3 = Book(
        user_id=3,
        title='To Kill a Mockingbird',
        author='Harper Lee',
        genre='Fiction',
        description='A novel about racism and injustice in the Deep South.',
        image_url='https://ia601601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_64.zip&file=0014649208-M.jpg',
        status='available'
    )

    db.session.add(book1)
    db.session.add(book2)
    db.session.add(book3)
    db.session.commit()

def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
