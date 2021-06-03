import React from 'react';
import PropTypes from 'prop-types';
import BookCategory from './BookCategory';

const BookList = props => {
  const { books, changeCategory } = props;
  const categoryTypes = [
    { type: 'currentlyReading', title: 'Currently Reading' },
    { type: 'wantToRead', title: 'Want to Read' },
    { type: 'read', title: 'Read' }
  ];

  return (
    <div className="list-books-content">
      {categoryTypes.map((category, index) => {
        const categoryBooks = books.filter(book => book.shelf === category.type);
        return (
          <div className="bookcategory" key={index}>
            <h2 className="bookcategory-title">{category.title}</h2>
            <div className="bookcategory-books">
              <BookCategory books={categoryBooks} changeCategory={changeCategory} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  changeCategory: PropTypes.func.isRequired
};

export default BookList