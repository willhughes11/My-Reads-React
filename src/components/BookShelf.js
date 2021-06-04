import React from 'react';
import Book from './Book';

const BookShelf = function (props) {

  let bookShelfChange = (book, shelf) => {
      props.onBookShelfChange(book, shelf);
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.map((book) => (
              <li key={book.id}>
                <Book book={book} bookShelfChange={bookShelfChange}/>
              </li>
            ))}
          </ol>
        </div>
    </div>
  )

}

export default BookShelf