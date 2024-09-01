from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text

def seed_books():
    # User 1 Books (Demo)
    books_user_1 = [
        Book(user_id=1, title='The Great Gatsby', author='F. Scott Fitzgerald', genre='Fiction',
             description='A novel set in the Roaring Twenties.', image_url='https://covers.openlibrary.org/b/id/12364437-L.jpg', status='available'),
        Book(user_id=1, title='Moby Dick', author='Herman Melville', genre='Adventure',
             description='A novel about the voyage of the whaling ship Pequod.', image_url='https://ia600505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_62.zip&file=0012621992-M.jpg', status='available'),
        Book(user_id=1, title='Pride and Prejudice', author='Jane Austen', genre='Romance',
             description='A novel about manners, upbringing, morality, and marriage.', image_url='https://ia801601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_61.zip&file=0014619627-M.jpg', status='available'),
        Book(user_id=1, title='Frankenstein', author='Mary Shelley', genre='Horror',
             description='A novel about a young scientist who creates a sapient creature.', image_url='https://ia800505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_19.zip&file=0012193040-M.jpg', status='available'),
        Book(user_id=1, title='Dracula', author='Bram Stoker', genre='Horror',
             description='A Gothic novel about Count Dracula.', image_url='https://covers.openlibrary.org/b/id/7894815-M.jpg', status='available'),
        Book(user_id=1, title='Wuthering Heights', author='Emily Brontë', genre='Romance',
             description='A novel about the intense and almost demonic love between Catherine Earnshaw and Heathcliff.', image_url='https://ia801601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_54.zip&file=0014543388-M.jpg', status='available'),
        Book(user_id=1, title='Jane Eyre', author='Charlotte Brontë', genre='Romance',
             description='A novel about the experiences of the eponymous heroine.', image_url='https://ia800505.us.archive.org/view_archive.php?archive=/10/items/m_covers_0011/m_covers_0011_65.zip&file=0011657937-M.jpg', status='available'),
        Book(user_id=1, title='The Picture of Dorian Gray', author='Oscar Wilde', genre='Philosophical Fiction',
             description='A novel about a man who stays young while his portrait ages.', image_url='https://ia801601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_31.zip&file=0014314699-M.jpg', status='available'),
        Book(user_id=1, title='Crime and Punishment', author='Fyodor Dostoevsky', genre='Psychological Fiction',
             description='A novel about the moral dilemmas of a poor ex-student who commits a crime.', image_url='https://ia600505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_62.zip&file=0012622046-M.jpg', status='available'),
        Book(user_id=1, title='Les Misérables', author='Victor Hugo', genre='Historical Fiction',
             description='A novel about the struggles of various characters in early 19th-century France.', image_url='https://ia600505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_94.zip&file=0012940454-M.jpg', status='available'),
        Book(user_id=1, title='The Hobbit', author='J.R.R. Tolkien', genre='Fantasy',
             description='A novel about a hobbit\'s quest to win a share of the treasure guarded by a dragon.', image_url='https://ia903000.us.archive.org/view_archive.php?archive=/3/items/m_covers_0008/m_covers_0008_40.zip&file=0008406778-M.jpg', status='available'),
        Book(user_id=1, title='The Lord of the Rings: The Fellowship of the Ring', author='J.R.R. Tolkien', genre='Fantasy',
             description='The first part of the epic fantasy trilogy.', image_url='https://covers.openlibrary.org/b/id/14625573-M.jpg', status='available'),
        Book(user_id=1, title='The Lord of the Rings: The Two Towers', author='J.R.R. Tolkien', genre='Fantasy',
             description='The second part of the epic fantasy trilogy.', image_url='https://covers.openlibrary.org/b/id/14627082-M.jpg', status='available'),
        Book(user_id=1, title='The Lord of the Rings: The Return of the King', author='J.R.R. Tolkien', genre='Fantasy',
             description='The final part of the epic fantasy trilogy.', image_url='https://covers.openlibrary.org/b/id/14626842-M.jpg', status='available'),
        Book(user_id=1, title='The Silmarillion', author='J.R.R. Tolkien', genre='Fantasy',
             description='A collection of mythopoeic works.', image_url='https://ia600505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_61.zip&file=0012615164-M.jpg', status='available')
    ]

    # User 2 Books (Marnie)
    books_user_2 = [
        Book(user_id=2, title='1984', author='George Orwell', genre='Dystopian',
             description='A novel about totalitarianism and surveillance.', image_url='https://ia800505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_91.zip&file=0012919048-M.jpg', status='available'),
        Book(user_id=2, title='Brave New World', author='Aldous Huxley', genre='Dystopian',
             description='A novel about a futuristic World State with genetically modified citizens.', image_url='https://ia600505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_64.zip&file=0012645094-M.jpg', status='available'),
        Book(user_id=2, title='Fahrenheit 451', author='Ray Bradbury', genre='Dystopian',
             description='A novel about a future society where books are outlawed and "firemen" burn any that are found.', image_url='https://ia803000.us.archive.org/view_archive.php?archive=/3/items/m_covers_0008/m_covers_0008_46.zip&file=0008461232-M.jpg', status='available'),
        Book(user_id=2, title='The Handmaid\'s Tale', author='Margaret Atwood', genre='Dystopian',
             description='A novel about a dystopian future where a theocratic regime subjugates women.', image_url='https://ia801601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_65.zip&file=0014657054-M.jpg', status='available'),
        Book(user_id=2, title='The Road', author='Cormac McCarthy', genre='Dystopian',
             description='A novel about a father and son\'s journey through a post-apocalyptic world.', image_url='https://ia803000.us.archive.org/view_archive.php?archive=/3/items/m_covers_0008/m_covers_0008_37.zip&file=0008375198-M.jpg', status='available'),
        Book(user_id=2, title='Lord of the Flies', author='William Golding', genre='Dystopian',
             description='A novel about a group of boys stranded on an uninhabited island and their disastrous attempt to govern themselves.', image_url='https://ia800505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_72.zip&file=0012723951-M.jpg', status='available'),
        Book(user_id=2, title='Animal Farm', author='George Orwell', genre='Dystopian',
             description='A political allegory in which farm animals overthrow their human farmer.', image_url='https://ia801601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_56.zip&file=0014564939-M.jpg', status='available'),
        Book(user_id=2, title='The Giver', author='Lois Lowry', genre='Dystopian',
             description='A novel about a society that appears utopian but hides a dark secret.', image_url='https://ia800505.us.archive.org/view_archive.php?archive=/25/items/m_covers_0010/m_covers_0010_53.zip&file=0010530628-M.jpg', status='available'),
        Book(user_id=2, title='A Clockwork Orange', author='Anthony Burgess', genre='Dystopian',
             description='A novel about the extreme violence and government control.', image_url='https://ia601601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_43.zip&file=0014430517-M.jpg', status='available'),
        Book(user_id=2, title='The Hunger Games', author='Suzanne Collins', genre='Dystopian',
             description='A novel about a deadly competition in a dystopian society.', image_url='https://ia800505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_02.zip&file=0012024280-M.jpg', status='available'),
        Book(user_id=2, title='Dune', author='Frank Herbert', genre='Science Fiction',
             description='A novel about the struggle for control of a desert planet.', image_url='https://covers.openlibrary.org/b/id/6978883-M.jpg', status='available'),
        Book(user_id=2, title='Ender\'s Game', author='Orson Scott Card', genre='Science Fiction',
             description='A novel about a young boy who is trained to fight in an interstellar war.', image_url='https://imgs.search.brave.com/zNXoBjOOLQesCOoUjFCG_6CL_MkVMy6dOfq_KaHwGz8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmNvbGxpZGVy/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzL2VuZGVycy1n/YW1lLWJvb2stY292/ZXIuanBn', status='available'),
        Book(user_id=2, title='The War of the Worlds', author='H.G. Wells', genre='Science Fiction',
             description='A novel about an alien invasion of Earth.', image_url='https://imgs.search.brave.com/zcfuSb3Qi-KxfuAIRxautnvDSslcD_xvBg7UIMMVGE0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnRo/cmlmdGJvb2tzLmNv/bS9hcGkvaW1hZ2Vo/YW5kbGVyL20vQTI3/REI4MzBEQ0FGQjc0/NzdFQjVFMzlFMEI4/QUM2NDVBMkM3RjQ1/NC5qcGVn', status='available'),
        Book(user_id=2, title='The Time Machine', author='H.G. Wells', genre='Science Fiction',
             description='A novel about a man who travels through time.', image_url='https://imgs.search.brave.com/98Dw7Hb6mNyWKatdpSK3g2lg6UVovQgpMWih_gRjYYg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9waWN0/dXJlcy5hYmVib29r/cy5jb20vaW52ZW50/b3J5L21kL21kMzE1/ODY1MTUwMzUuanBn', status='available'),
        Book(user_id=2, title='Neuromancer', author='William Gibson', genre='Science Fiction',
             description='A novel that popularized the cyberpunk genre.', image_url='https://imgs.search.brave.com/qSrY1z88B2_G_43I8juxB071oBB6X85ieBXMDeXMsmw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnRo/cmlmdGJvb2tzLmNv/bS9hcGkvaW1hZ2Vo/YW5kbGVyL20vODZE/OEIyQzc4RjRBQjFD/QzIyMEFDQjcyMUY2/RkJENkRCOUY5MEI4/My5qcGVn', status='available')
    ]

    # User 3 Books (Bobbie)
    books_user_3 = [
        Book(user_id=3, title='To Kill a Mockingbird', author='Harper Lee', genre='Fiction',
             description='A novel about racism and injustice in the Deep South.', image_url='https://ia601601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_64.zip&file=0014649208-M.jpg', status='available'),
        Book(user_id=3, title='The Catcher in the Rye', author='J.D. Salinger', genre='Fiction',
             description='A novel about a teenager\'s disillusionment with the adult world.', image_url='https://ia903200.us.archive.org/view_archive.php?archive=/23/items/m_covers_0009/m_covers_0009_24.zip&file=0009245645-M.jpg', status='available'),
        Book(user_id=3, title='Of Mice and Men', author='John Steinbeck', genre='Fiction',
             description='A novel about two displaced migrant ranch workers during the Great Depression.', image_url='https://ia800505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_90.zip&file=0012902976-M.jpg', status='available'),
        Book(user_id=3, title='The Grapes of Wrath', author='John Steinbeck', genre='Fiction',
             description='A novel about a poor family\'s journey west during the Great Depression.', image_url='https://ia801601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_42.zip&file=0014424111-M.jpg', status='available'),
        Book(user_id=3, title='Slaughterhouse-Five', author='Kurt Vonnegut', genre='Science Fiction',
             description='A novel that combines elements of science fiction and war memoir.', image_url='https://imgs.search.brave.com/h7G7r_R_EDEc8fwdHhfuhb1dHIFClxh4qeZ8Nin6HRs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMyLnBlbmd1aW5y/YW5kb21ob3VzZS5j/b20vY292ZXIvOTc4/MDM4NTMzMzg0OQ.jpeg', status='available'),
        Book(user_id=3, title='Catch-22', author='Joseph Heller', genre='Satire',
             description='A novel set during World War II, known for its absurdist plot and themes.', image_url='https://imgs.search.brave.com/DuLGS0xtE8NfWKN2R7Q1HnwCbaFCD8BLyuKnLotIzII/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnRo/cmlmdGJvb2tzLmNv/bS9hcGkvaW1hZ2Vo/YW5kbGVyL20vQzU4/QjExNTQ2QkRFNDVC/RjQ5QkQyNTBCREY0/RjA2MDg2NEI0NUU4/Ny5qcGVn', status='available'),
        Book(user_id=3, title='Brave New World', author='Aldous Huxley', genre='Dystopian',
             description='A novel about a futuristic World State with genetically modified citizens.', image_url='https://ia600505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_64.zip&file=0012645094-M.jpg', status='available'),
        Book(user_id=3, title='1984', author='George Orwell', genre='Dystopian',
             description='A novel about totalitarianism and surveillance.', image_url='https://ia800505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_91.zip&file=0012919048-M.jpg', status='available'),
        Book(user_id=3, title='The Road', author='Cormac McCarthy', genre='Dystopian',
             description='A novel about a father and son\'s journey through a post-apocalyptic world.', image_url='https://imgs.search.brave.com/jrPRccg9zklKjzp4Z9wE6sLp6HpJHcpZIuigGy54aGY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFHdVdnVHZ6b0wu/anBn', status='available'),
        Book(user_id=3, title='Lord of the Flies', author='William Golding', genre='Dystopian',
             description='A novel about a group of boys stranded on an uninhabited island and their disastrous attempt to govern themselves.', image_url='https://imgs.search.brave.com/F_exMbCZ20uvlAV5v2_N2gXgaUPqHTEmRkhnE_fjy2M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFlZUFXSXR3Ykwu/anBn', status='available'),
        Book(user_id=3, title='The Picture of Dorian Gray', author='Oscar Wilde', genre='Philosophical Fiction',
             description='A novel about a man who stays young while his portrait ages.', image_url='https://imgs.search.brave.com/Z4OL74ImWeyQC0_07S2kB2qPs0N_9qiFNMZwUzGrR-8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxM2Y2YThWVlRT/LmpwZw', status='available'),
        Book(user_id=3, title='Jane Eyre', author='Charlotte Brontë', genre='Romance',
             description='A novel about the experiences of the eponymous heroine.', image_url='https://imgs.search.brave.com/BZFvPZNcnSroCCGCNdzjysGmTDnudvQ8l_B73bShuCo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFiZ212QVQxSFMu/anBn', status='available'),
        Book(user_id=3, title='Wuthering Heights', author='Emily Brontë', genre='Romance',
             description='A novel about the intense and almost demonic love between Catherine Earnshaw and Heathcliff.', image_url='https://imgs.search.brave.com/zxaWLtH6dmE_HoJBXrmJk2LBEsljleJWyZZODmUv_m0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGVy/bGluZy11cy5pbWdp/eC5uZXQvY292ZXJz/Lzk3ODE0NTQ5NTQ4/MzUuanBnP2F1dG89/Zm9ybWF0Jmg9Mjkw', status='available'),
        Book(user_id=3, title='Dracula', author='Bram Stoker', genre='Horror',
             description='A Gothic novel about Count Dracula.', image_url='https://imgs.search.brave.com/RmCQ24ybhbM6yNojKTuMnhgNN76eOsfKJOJUzJFjVx0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFLaS1lMXZqakwu/anBn', status='available'),
        Book(user_id=3, title='Frankenstein', author='Mary Shelley', genre='Horror',
             description='A novel about a young scientist who creates a sapient creature.', image_url='https://imgs.search.brave.com/Yh6nVrY67c9Tlr07HvRPB9DQJSDRK23cMyhpPalOsIU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kMjho/Z3ByaThhbTJpZi5j/bG91ZGZyb250Lm5l/dC9ib29rX2ltYWdl/cy9jdnI5NzgwNzQz/NDg3NTgwXzk3ODA3/NDM0ODc1ODBfbGcu/anBn', status='available')
    ]

    # User 4 Books (John)
    books_user_4 = [
        Book(user_id=4, title='Moby Dick', author='Herman Melville', genre='Adventure',
             description='A novel about the voyage of the whaling ship Pequod.', image_url='https://imgs.search.brave.com/0VZOAMm1wPxwlX2Q2cGFG4-hfmgvZ22ql2-rrY_44GE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnRo/cmlmdGJvb2tzLmNv/bS9hcGkvaW1hZ2Vo/YW5kbGVyL20vNkE4/NUJCNEYyODYxRTNB/MERFQTIwODk3NkRG/RDY2QTRCNkE5OEND/Ny5qcGVn', status='available'),
        Book(user_id=4, title='Pride and Prejudice', author='Jane Austen', genre='Romance',
             description='A novel about manners, upbringing, morality, and marriage.', image_url='https://imgs.search.brave.com/V7MhELoReaEyhSI37J1VpZyu_tMonx4si9wGmbRrBOQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDE0NDV2RWN1U0wu/anBn', status='available'),
        Book(user_id=4, title='The Adventures of Huckleberry Finn', author='Mark Twain', genre='Adventure',
             description='A novel about the adventures of a boy and a runaway slave.', image_url='https://imgs.search.brave.com/OjcIYsTS_ZeN6vXGUsyJmeawxu62rdY4N-IQz6tQZLw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGVy/bGluZy11cy5pbWdp/eC5uZXQvY292ZXJz/Lzk3ODE0MzUxNzE4/MzEuanBnP2F1dG89/Zm9ybWF0Jmg9NjQ4', status='available'),
        Book(user_id=4, title='Great Expectations', author='Charles Dickens', genre='Fiction',
             description='A novel about the growth and personal development of an orphan named Pip.', image_url='https://imgs.search.brave.com/5CCE9Lz3ua1snQ0RdChj1scNYPcdGli5AbBvqhdXiKo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MzFNYk5QbC1sclMu/anBn', status='available'),
        Book(user_id=4, title='Don Quixote', author='Miguel de Cervantes', genre='Adventure',
             description='A novel about the adventures of a nobleman who reads so many chivalric romances that he loses his sanity.', image_url='https://imgs.search.brave.com/01lPstI7Hs3Hyys54tZdlCWJ5Ib3N-H42PnSdBRGTuc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kMjho/Z3ByaThhbTJpZi5j/bG91ZGZyb250Lm5l/dC9ib29rX2ltYWdl/cy9vbml4L2N2cjk3/ODE3ODc1NTY5MDQv/ZG9uLXF1aXhvdGUt/OTc4MTc4NzU1Njkw/NF9sZy5qcGc', status='available'),
        Book(user_id=4, title='War and Peace', author='Leo Tolstoy', genre='Historical Fiction',
             description='A novel that chronicles the history of the French invasion of Russia.', image_url='https://imgs.search.brave.com/D290M0dih2e76LysOl88f9qTZ0iO326DHjoIzwHglN0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9waWN0/dXJlcy5hYmVib29r/cy5jb20vaXNibi85/NzgwNDUxNTMwNTQ3/LXVzLTMwMC5qcGc', status='available'),
        Book(user_id=4, title='Anna Karenina', author='Leo Tolstoy', genre='Romance',
             description='A novel that tells the tragic story of a married aristocrat and her affair with the affluent Count Vronsky.', image_url='https://imgs.search.brave.com/VjwAiCaruWDg7syofCSEQo9hKoDxcRNDC0crnichFCA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnRo/cmlmdGJvb2tzLmNv/bS9hcGkvaW1hZ2Vo/YW5kbGVyL20vQTND/NjBCRjU5MjA5Nzgx/RDNCMEVFQ0E2NjVD/NkNGMTRBOUJFMDA1/RC5qcGVn', status='available'),
        Book(user_id=4, title='Madame Bovary', author='Gustave Flaubert', genre='Literary Fiction',
             description='A novel that focuses on a doctor\'s wife, Emma Bovary, who has adulterous affairs.', image_url='https://imgs.search.brave.com/dewxZlwUwQz0HmFGIqwTbJymezR8VNBcWlPL6mb1Q2Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFPbit2NktQUEwu/anBn', status='available'),
        Book(user_id=4, title='The Brothers Karamazov', author='Fyodor Dostoevsky', genre='Philosophical Fiction',
             description='A novel about the spiritual drama of moral struggles concerning faith, doubt, and reason.', image_url='https://imgs.search.brave.com/G20zEB0nxr9sBIKFpqeAWO-AuxazirVcbgMqFMia3mQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzgxWHdvTmNRYndT/LmpwZw', status='available'),
        Book(user_id=4, title='Ulysses', author='James Joyce', genre='Modernist Novel',
             description='A novel that chronicles the appointments and encounters of Leopold Bloom in Dublin in the course of an ordinary day.', image_url='https://imgs.search.brave.com/Abz77Dw2osVWSKg91mZdAYR-Zt9xHBlm02FXLX9591s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuYW1lcmljYW5s/aXRlcmF0dXJlLmNv/bS9pbWFnZXMvYm9v/ay91bHlzc2VzLmpw/Zw', status='available'),
        Book(user_id=4, title='Moby Dick', author='Herman Melville', genre='Adventure',
             description='A novel about the voyage of the whaling ship Pequod.', image_url='https://imgs.search.brave.com/s17vhUxkV6XDQEz8nP4pmrJlPMblLaGeaKcYrefva6g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTExTUFETzZ6NUwu/anBn', status='available'),
        Book(user_id=4, title='Pride and Prejudice', author='Jane Austen', genre='Romance',
             description='A novel about manners, upbringing, morality, and marriage.', image_url='https://imgs.search.brave.com/X0aIlb_qb5bxPNkuB3FlZgEz9P8NZWkf9FRW14fWYtI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9qYW5l/YXVzdGVucy5ob3Vz/ZS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8wNS9QUC12b2wt/SS10aXRsZS1wYWdl/LUxvdy1SZXMtUC1T/bWl0aC5qcGc', status='available'),
        Book(user_id=4, title='The Adventures of Huckleberry Finn', author='Mark Twain', genre='Adventure',
             description='A novel about the adventures of a boy and a runaway slave.', image_url='https://imgs.search.brave.com/ukWMTa_6hehePJY9wL79_gcxBO3cL7uZTovuDjlQvCg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFKVXpJU2E1cUwu/anBn', status='available'),
        Book(user_id=4, title='Great Expectations', author='Charles Dickens', genre='Fiction',
             description='A novel about the growth and personal development of an orphan named Pip.', image_url='https://imgs.search.brave.com/1G9WjFdJ0tMtE3q-bXZMNXHIUFXqvkk4wjCJJwiPfO8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ExL2My/L2EzL2ExYzJhMzMw/MzRiNDE2ZTYxNmVh/MTE0Y2RkMDY1YjNk/LmpwZw', status='available'),
        Book(user_id=4, title='Don Quixote', author='Miguel de Cervantes', genre='Adventure',
             description='A novel about the adventures of a nobleman who reads so many chivalric romances that he loses his sanity.', image_url='https://imgs.search.brave.com/u8YPSIbGu0WUV9pldpCruQTLVGHkRqCmlGeNP9Qf_Jg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzgxcEZuZGZYVDJM/LmpwZw', status='available')
    ]

    # User 5 Books (Jane)
    books_user_5 = [
        Book(user_id=5, title='War and Peace', author='Leo Tolstoy', genre='Historical Fiction',
             description='A novel that chronicles the history of the French invasion of Russia.', image_url='https://imgs.search.brave.com/dj7DQRuuSDZ8HV2Jr5xEIq3g8eeGHOr8UyRugw67T9M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM0LnBlbmd1aW5y/YW5kb21ob3VzZS5j/b20vY292ZXIvOTc4/MTQwMDA3OTk4OA.jpeg', status='available'),
        Book(user_id=5, title='Anna Karenina', author='Leo Tolstoy', genre='Romance',
             description='A novel that tells the tragic story of a married aristocrat and her affair with the affluent Count Vronsky.', image_url='https://imgs.search.brave.com/qqzkIEiB-TYLddd1BHyWdRbLO_5TSrYXRtzL_GOWYVY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxKzQtcDBCSUxM/LmpwZw', status='available'),
        Book(user_id=5, title='Madame Bovary', author='Gustave Flaubert', genre='Literary Fiction',
             description='A novel that focuses on a doctor\'s wife, Emma Bovary, who has adulterous affairs.', image_url='https://imgs.search.brave.com/MEMJaXBjAney80xslRvBe-9H7gvEmmL88z3GcZOWF50/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z3V0ZW5iZXJnLm9y/Zy9jYWNoZS9lcHVi/LzI0MTMvcGcyNDEz/LmNvdmVyLm1lZGl1/bS5qcGc', status='available'),
        Book(user_id=5, title='The Brothers Karamazov', author='Fyodor Dostoevsky', genre='Philosophical Fiction',
             description='A novel about the spiritual drama of moral struggles concerning faith, doubt, and reason.', image_url='https://imgs.search.brave.com/JJjesx5zqaLaXsqj5AUCTjqwjtcMRYgckeKsZwwCfjc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFpdkZjLXBwTEwu/anBn', status='available'),
        Book(user_id=5, title='Ulysses', author='James Joyce', genre='Modernist Novel',
             description='A novel that chronicles the appointments and encounters of Leopold Bloom in Dublin in the course of an ordinary day.', image_url='https://imgs.search.brave.com/41g0DJjN4_aBHYgRBaVIli3_Ye_OO1qiw9BVh3_SFXY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9waWN0/dXJlcy5hYmVib29r/cy5jb20vaXNibi85/NzgwMzk0NzQzMTI3/LXVzLTMwMC5qcGc', status='available'),
        Book(user_id=5, title='Lolita', author='Vladimir Nabokov', genre='Literary Fiction',
             description='A novel about a middle-aged literature professor who becomes obsessed with a 12-year-old girl.', image_url='https://imgs.search.brave.com/IUZZ4foSatBeOzyEfOPSf-57MAsUDUE_7HmO5MMq7uQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MzE4V2ptVjA2U0wu/anBn', status='available'),
        Book(user_id=5, title='The Metamorphosis', author='Franz Kafka', genre='Absurdist Fiction',
             description='A novella about a man who wakes up to find himself transformed into a large insect.', image_url='https://imgs.search.brave.com/vAHkPOI4B2UfIMmCUCzgs4-pXZhGgvHgu5LwUtetvTk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vaHpwd3J3ZmRp/L2ltYWdlL3VwbG9h/ZC93XzIyMC9tZWRp/YS9jb3ZlcnMvdGhl/LW1ldGFtb3JwaG9z/ZXMtc2VsZWN0ZWQt/c3Rvcmllcy1pbi12/ZXJzZV9ramV2enE.jpeg', status='available'),
        Book(user_id=5, title='The Trial', author='Franz Kafka', genre='Absurdist Fiction',
             description='A novel about a man who is arrested and prosecuted by a remote, inaccessible authority, with the nature of his crime revealed to neither him nor the reader.', image_url='https://imgs.search.brave.com/l48GFJshCYr1PzeYvWjsKYZlxBzAGDe6ufyOsY9GENk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9waWN0/dXJlcy5hYmVib29r/cy5jb20vaW52ZW50/b3J5L21kL21kMzE1/MDg5NTU5MzguanBn', status='available'),
        Book(user_id=5, title='Moby Dick', author='Herman Melville', genre='Adventure',
             description='A novel about the voyage of the whaling ship Pequod.', image_url='https://imgs.search.brave.com/e6d_FS6RvFXnwQqgorJ7XMwqQsion6cmk1KtvE-FZ7c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFyWFhpM0JsS0wu/anBn', status='available'),
        Book(user_id=5, title='Pride and Prejudice', author='Jane Austen', genre='Romance',
             description='A novel about manners, upbringing, morality, and marriage.', image_url='https://imgs.search.brave.com/nO7uilr-3X2UY0BgL-KLD5BgAhYsQzWpGzb3Ui-Vnx0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2RhL2Ey/LzE1L2RhYTIxNThh/Yzc1OWYzYzEyMjMy/OTcwMWQ0NDFhZTZl/LmpwZw', status='available'),
        Book(user_id=5, title='The Adventures of Huckleberry Finn', author='Mark Twain', genre='Adventure',
             description='A novel about the adventures of a boy and a runaway slave.', image_url='https://imgs.search.brave.com/6eRR-G3W49EqZo6IvlvXa_yCfaPAHQNjjZDPBiC20FQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FudGVyYnVyeWNs/YXNzaWNzYm9va3Mu/Y29tL3htbC9pbWFn/ZXMvOTc4MTYwNzEw/NTUwMy5qcGc', status='available'),
        Book(user_id=5, title='Great Expectations', author='Charles Dickens', genre='Fiction',
             description='A novel about the growth and personal development of an orphan named Pip.', image_url='https://imgs.search.brave.com/tzw0fU5z3I9QrCnKA7aiC8i3A_8k7j-4qi4rtCw1ac8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9waWN0/dXJlcy5hYmVib29r/cy5jb20vaW52ZW50/b3J5L21kL21kMzE4/MjUxNjUxNTYuanBn', status='available'),
        Book(user_id=5, title='Don Quixote', author='Miguel de Cervantes', genre='Adventure',
             description='A novel about the adventures of a nobleman who reads so many chivalric romances that he loses his sanity.', image_url='https://imgs.search.brave.com/aCmjGh-wuam70KjIcF0Yp4TnugcyYRyud5tqT_-qLcU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzU0/ZWY0YTkzZTRiMDFi/OTY5ZDMyMDU0MC8x/NDQ2MTYyMzYxOTk2/LUo3MkpBMkFYVVEw/R0RZWEc3UFcxLzk3/ODE2MzIwNjA3NTQu/anBn', status='available'),
        Book(user_id=5, title='War and Peace', author='Leo Tolstoy', genre='Historical Fiction',
             description='A novel that chronicles the history of the French invasion of Russia.', image_url='https://imgs.search.brave.com/UVpCzvfncl6hiGX21hbRNU-wurB8ocgP3TsDcuW0zjU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9waWN0/dXJlcy5hYmVib29r/cy5jb20vaW52ZW50/b3J5L21kL21kMzE4/NTY1MjkzNTAuanBn', status='available')
    ]

    db.session.add_all(books_user_1 + books_user_2 + books_user_3 + books_user_4 + books_user_5)
    db.session.commit()

def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
