import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
  state = {
    queryStr: '',
    bookArr: [],
    shelfedBookArr: [],
  };

  async componentDidMount() {
    const shelfedBookArr = await BooksAPI.getAll();
    this.setState({ shelfedBookArr });
  }

  async componentDidUpdate(prevState){
    if(this.state.shelfedBookArr !== prevState.shelfedBookArr){
      const shelfedBookArr = await BooksAPI.getAll();
      this.setState({ shelfedBookArr });
    }
  }

  getBooks = e => {
    const queryStr = e.target.value;
    const shelfedBooks = this.state.shelfedBookArr;
    this.setState({ queryStr });

    if (queryStr !== undefined && queryStr !== '') {
      BooksAPI.search(queryStr).then(books => {
        if(books !== undefined){
          if(books.length > 0){
            let idArr =[]
            books.forEach(bookItem => {
              shelfedBooks.forEach(shelfItem => {
                if(shelfItem.id === bookItem.id){
                  bookItem["shelf"] = shelfItem.shelf;
                  idArr.push(bookItem.id)
                }
                else if(shelfItem.id !== bookItem.id && idArr.includes(bookItem.id) === false){
                  bookItem["shelf"] = "none"
                }
              });
            });
            console.log(books)
            this.setState({ bookArr: books})
          }
          else {
            this.setState({ bookArr: []});
          }
        }
      });
    } else this.setState({ bookArr: []});
  };

  bookShelfChange = (book, shelf) => {
    this.props.onBookShelfChange(book, shelf);
}

  render() {
    const { queryStr, bookArr } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={queryStr} onChange={this.getBooks} />
          </div>
        </div>
        <div className="search-books-results">
          {bookArr.length > 0 && queryStr !== '' ? (
            <div>
              <h3>Search returned {bookArr.length} books </h3>
              <ol className="books-grid">
                {bookArr.map(book => (
                  <li key={book.id}>
                    <Book book={book} bookShelfChange={this.bookShelfChange} />
                  </li>
                ))}
              </ol>
            </div>
          ) : bookArr.length === 0 && queryStr !== '' ? (
            <h3>Search did not return any books. Please try again!</h3>
          ) : (
            <h3>Results will appear here...</h3>
          )
          }
        </div>
      </div>
    );
  }
}
export default Search