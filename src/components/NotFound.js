import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../images/books-stacked.jpg';

const NotFound = () => (
  <div>
    <h1 className="not-found-title">
      Couldn't the books you were looking for...
    </h1>
    <figure className="not-found-img">
      <img src={notFound} alt="Page Not Found" />
      <figcaption>
        Photo of books that are stacked
      </figcaption>
    </figure>
    <div className="home-link">
      <Link to="/">Return to the main page and try again</Link>
    </div>
  </div>
);

export default NotFound