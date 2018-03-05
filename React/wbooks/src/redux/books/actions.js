import * as types from './actionTypes';

import * as bookService from '../../services/bookService';

export const fetchBooks = () => async (dispatch, getState) => {
  const response = await bookService.getAllBooks();
  if (response.statusText === 'OK') {
    dispatch({ type: types.BOOKS_FETCHED, response });
  }
}

export const getBookDetail = (bookId, books) => (dispatch, getState) => {
  const filteredBooks = books.filter((book) => book.id == bookId);
  const book = filteredBooks[0];
  dispatch({ type: types.BOOKS_DETAILED, book });
}

export const saveFilter = (filter) => (dispatch, getState) => dispatch({ type: types.BOOKS_FILTER_CHANGED, filter });

export const saveFilterParam = (filterParam) => (dispatch, getState) => dispatch({ type: types.BOOKS_FILTER_PARAM_CHANGED, filterParam });
