import React from 'react';
import PropTypes from 'prop-types';
import CategoryChanger from './CategoryChanger';
import noCover from '../images/no-cover-image.jpg';

const Book = props => {
  const { book, books, changeCategory } = props;
  const coverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover;
  const title = book.title ? book.title : 'No title available';

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: `url(${coverImg})` }}/>
          <CategoryChanger book={book} books={books} changeCategory={changeCategory} />
        </div>
        <div className="book-title">{title}</div>
        {
        book.authors &&
          book.authors.map((author, index) => (
            <div className="book-authors" key={index}>
              {author}
            </div>
          ))}
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  changeCategory: PropTypes.func.isRequired
};

export default Book