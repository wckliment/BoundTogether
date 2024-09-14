import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkAddBook } from '../../redux/books';
import './AddBookForm.css'

const AddBookForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({}); // State for handling errors

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!author.trim()) newErrors.author = 'Author is required.';
    if (!genre.trim()) newErrors.genre = 'Genre is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const bookData = {
      title,
      author,
      genre,
      description,
      image_url: imageUrl,
      status: 'available',  // Default status
    };

    dispatch(thunkAddBook(bookData))
      .then(() => closeModal())
      .catch((err) => console.error('Failed to add book:', err));
  };

  return (
    <div className="add-book-form">
      <h2 className="modal-title">Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {errors.author && <p className="error">{errors.author}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          {errors.genre && <p className="error">{errors.genre}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">Add Book</button>
          <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
