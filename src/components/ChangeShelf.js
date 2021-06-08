import React, { Component } from 'react';
import BookShelf from './BookShelf'

class ChangeShelf extends Component {

bookShelfChange = (book, shelf) => {
    this.props.onBookShelfChange(book, shelf);
}

  render() {
    return (
      <div className="list-books-content">
        <div>
          <BookShelf
            title="Currently Reading"
            attribute="currentlyReading"
            books={this.props.books.filter(b => b.shelf === 'currentlyReading')}
            onBookShelfChange={this.bookShelfChange}
          />
          <BookShelf
            title="Want to Read"
            attribute="wantToRead"
            books={this.props.books.filter(b => b.shelf === 'wantToRead')}
            onBookShelfChange={this.bookShelfChange}
          />
          <BookShelf
            title="Read"
            attribute="read"
            books={this.props.books.filter(b => b.shelf === 'read')}
            onBookShelfChange={this.bookShelfChange}
          />
        </div>
      </div>
    )
}
}

export default ChangeShelf