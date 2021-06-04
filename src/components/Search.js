import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
  };

  state = {
    query: '',
    newBooks: [],
    searchErr: false
  };

  getBooks = event => {
    const query = event.target.value;
    this.setState({ query });

    if (query) {
      BooksAPI.search(query.trim(), 20).then(books => {
        books.length > 0
          ? this.setState({ newBooks: books, searchErr: false })
          : this.setState({ newBooks: [], searchErr: true });
      });

    } else this.setState({ newBooks: [], searchErr: false });
  };

  bookShelfChange = (book, shelf) => {
    this.props.onBookShelfChange(book, shelf);
}

  render() {
    const { query, newBooks, searchErr } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.getBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          {newBooks.length > 0 && (
            <div>
              <h3>Search returned {newBooks.length} books </h3>
              <ol className="books-grid">
                {newBooks.map(book => (
                  <li key={book.id}>
                    <Book book={book} bookShelfChange={this.bookShelfChange} />
                  </li>
                ))}
              </ol>
            </div>
          )}
          {searchErr && (
            <h3>Search did not return any books. Please try again!</h3>
          )}
        </div>
      </div>
    );
  }
}
export default Search