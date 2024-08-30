from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text

def seed_books():
    # User 1 Books
    book1 = Book(
        user_id=1,
        title='The Great Gatsby',
        author='F. Scott Fitzgerald',
        genre='Fiction',
        description='A novel set in the Roaring Twenties.',
        image_url='https://covers.openlibrary.org/b/id/12364437-L.jpg',
        status='available'
    )
    book4 = Book(
        user_id=1,
        title='Moby Dick',
        author='Herman Melville',
        genre='Adventure',
        description='A novel about the voyage of the whaling ship Pequod.',
        image_url='https://ia600505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_62.zip&file=0012621992-M.jpg',
        status='available'
    )
    book5 = Book(
        user_id=1,
        title='Pride and Prejudice',
        author='Jane Austen',
        genre='Romance',
        description='A novel about manners, upbringing, morality, and marriage.',
        image_url='https://ia801601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_61.zip&file=0014619627-M.jpg',
        status='available'
    )
    book6 = Book(
        user_id=1,
        title='Frankenstein',
        author='Mary Shelley',
        genre='Horror',
        description='A novel about a young scientist who creates a sapient creature.',
        image_url='https://ia800505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_19.zip&file=0012193040-M.jpg',
        status='available'
    )

    # User 2 Books
    book2 = Book(
        user_id=2,
        title='1984',
        author='George Orwell',
        genre='Dystopian',
        description='A novel about totalitarianism and surveillance.',
        image_url='https://ia800505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_91.zip&file=0012919048-M.jpg',
        status='available'
    )
    book7 = Book(
        user_id=2,
        title='Brave New World',
        author='Aldous Huxley',
        genre='Dystopian',
        description='A novel about a futuristic World State with genetically modified citizens.',
        image_url='https://ia600505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_64.zip&file=0012645094-M.jpg',
        status='available'
    )
    book8 = Book(
        user_id=2,
        title='Fahrenheit 451',
        author='Ray Bradbury',
        genre='Dystopian',
        description='A novel about a future society where books are outlawed and "firemen" burn any that are found.',
        image_url='https://ia803000.us.archive.org/view_archive.php?archive=/3/items/m_covers_0008/m_covers_0008_46.zip&file=0008461232-M.jpg',
        status='available'
    )
    book9 = Book(
        user_id=2,
        title='The Handmaid\'s Tale',
        author='Margaret Atwood',
        genre='Dystopian',
        description='A novel about a dystopian future where a theocratic regime subjugates women.',
        image_url='https://ia801601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_65.zip&file=0014657054-M.jpg',
        status='available'
    )

    # User 3 Books
    book3 = Book(
        user_id=3,
        title='To Kill a Mockingbird',
        author='Harper Lee',
        genre='Fiction',
        description='A novel about racism and injustice in the Deep South.',
        image_url='https://ia601601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_64.zip&file=0014649208-M.jpg',
        status='available'
    )
    book10 = Book(
        user_id=3,
        title='The Catcher in the Rye',
        author='J.D. Salinger',
        genre='Fiction',
        description='A novel about a teenager\'s disillusionment with the adult world.',
        image_url='https://ia903200.us.archive.org/view_archive.php?archive=/23/items/m_covers_0009/m_covers_0009_24.zip&file=0009245645-M.jpg',
        status='available'
    )
    book11 = Book(
        user_id=3,
        title='Of Mice and Men',
        author='John Steinbeck',
        genre='Fiction',
        description='A novel about two displaced migrant ranch workers during the Great Depression.',
        image_url='https://ia800505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_90.zip&file=0012902976-M.jpg',
        status='available'
    )
    book12 = Book(
        user_id=3,
        title='The Grapes of Wrath',
        author='John Steinbeck',
        genre='Fiction',
        description='A novel about a poor family\'s journey west during the Great Depression.',
        image_url='https://ia801601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_42.zip&file=0014424111-M.jpg',
        status='available'
    )

    db.session.add_all([book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12])
    db.session.commit()

def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
