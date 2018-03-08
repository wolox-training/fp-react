import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as booksActions from '../../../redux/books/actions';

import BookDetail from './layout';

class BookDetailContainer extends Component {
  componentWillMount = () => this.props.getBookDetail(this.props.match.params.bookId);

  render() {
    return <BookDetail isLoading={this.props.isDetailLoading} book={this.props.detailedBook} />;
  }
}
const getBook = state => state.books.books.find(book => book.id === Number(state.books.detailedBookId));

const mapStateToProps = state => ({
  detailedBook: getBook(state),
  isDetailLoading: state.books.isDetailLoading,
  books: state.books.books
});

const mapDispatchToProps = dispatch => ({
  getBookDetail: bookId => dispatch(booksActions.saveBookDetailId(bookId))
});

BookDetailContainer.propTypes = {
  getBookDetail: PropTypes.func.isRequired,
  isDetailLoading: PropTypes.bool.isRequired,
  detailedBook: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }),
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailContainer);
