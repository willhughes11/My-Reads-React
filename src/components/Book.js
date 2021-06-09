import React , { Component } from 'react';

class Book extends Component {

  bookShelfChange = (e) => {
    let newShelf = e.target.value;
    this.props.bookShelfChange(this, newShelf)
  }

  render() {
    const { title } = this.props.book;

  if(this.props.book.imageLinks === undefined ) {
    this.props.book.imageLinks = ['thumbnail'];
    this.props.book.imageLinks.thumbnail = "";
  }

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover">
            <img alt="" src={this.props.book.imageLinks.thumbnail} />
          </div>
          <div className="book-shelf-changer">
            <select onChange={this.bookShelfChange} defaultValue={this.props.book.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title === undefined ? "Unknown" : title}</div>
          <div className="book-authors">{this.props.book.authors === undefined ? "Unknown" : this.props.book.authors.join(', ')}</div>
      </div>
    )
  }
}

export default Book