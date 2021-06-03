import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import '../style/App.css';
import BookList from './BookList';
import { Link } from 'react-router-dom';
import Search from './Search';
import NotFound from './NotFound';

class BooksApp extends React.Component {
  state = { books: [] };


  changeCategory = (changedBook, category) => {
    BooksAPI.update(changedBook, category).then(response => {
      changedBook.category = category;
      this.setState(prevState => ({
        books: prevState.books
          .filter(book => book.id !== changedBook.id)
          .concat(changedBook)
      }));
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={() => (
              <Search books={books} changeCategory={this.changeCategory} />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <BookList books={books} changeCategory={this.changeCategory} />
                <div className="open-search">
                  <Link to="/search">Search</Link>
                </div>
              </div>
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp