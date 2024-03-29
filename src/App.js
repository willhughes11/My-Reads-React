import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './style/App.css';
import Search from './components/Search';
import ChangeShelf from './components/ChangeShelf';

class BooksApp extends Component {
  state = { 
    books: [] 
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }
  
  async componentDidUpdate(prevState){
    if(this.state.books !== prevState.books){
      const books = await BooksAPI.getAll();
      this.setState({ books });
    }
  }

  changeShelf = (book, newShelf) => {
    this.setState({
      book: this.state.books.filter( (b) => b.id !== book.props.book.id).concat([book.props.book])
    })
    book.props.book.shelf = newShelf;
    BooksAPI.update(book.props.book, newShelf);
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>My Reads</h1>
                </div>
                <ChangeShelf
                  books={this.state.books}
                  onBookShelfChange={this.changeShelf}
                />
                <div className="open-search">
                  <Link to="/search">Search</Link>
                </div>
              </div>
          )}/>
          <Route path="/search" render={() => (
              <Search
                books={this.state.books}
                onBookShelfChange={this.changeShelf}/>
          )}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp