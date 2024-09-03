import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkEditBook } from '../../redux/books';
import './EditBookForm.css';

const EditBookForm = ({ book, closeModal }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [description, setDescription] = useState(book.description);
  const [imageUrl, setImageUrl] = useState(book.image_url);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedBook = {
      ...book,
      title,
      author,
      genre,
      description,
      image_url: imageUrl,
    };

    dispatch(thunkEditBook(editedBook))
      .then(() => {
        closeModal();
      })
      .catch((err) => {
        console.error('Failed to edit book:', err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-book-form">
      <h2>Edit Book</h2>
      <label>Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Author</label>
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />

      <label>Genre</label>
      <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />

      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>Image URL</label>
      <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

      <button type="submit">Save Changes</button>
      <button type="button" onClick={closeModal}>Cancel</button>
    </form>
  );
};

export default EditBookForm;
