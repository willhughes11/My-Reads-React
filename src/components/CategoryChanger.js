import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    changeCategory: PropTypes.func.isRequired
  };

  updatecategory = event =>
    this.props.changeCategory(this.props.book, event.target.value);

  render() {
    const { book, books } = this.props;
    let currentCategory = 'none';
    
    for (let item of books) {
      if (item.id === book.id) {
        currentCategory = item.category;
        break;
      }
    }

    return (
      <div className="book-category-changer">
        <select onChange={this.updatecategory} defaultValue={currentCategory}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default CategoryChanger