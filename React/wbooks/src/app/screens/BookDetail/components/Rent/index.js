import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import moment from 'moment';

import Loader from '../../../../components/Loader';
import * as rentsActions from '../../../../../redux/rents/actions';

import Rent from './layout';

class RentContainer extends Component {
  handleRent = () => {
    const rents = this.props.localRents.concat(this.props.bookId);
    this.props.handleRent(rents);
  };

  handleWish = () => this.props.handleWish(this.props.bookId, this.props.userId);

  render() {
    return <Rent status={this.props.status} handleRent={this.handleRent} handleWish={this.handleWish} />;
  }
}

const getStatus = createSelector(
  [
    state => state.rents.rents,
    state => state.rents.localRents,
    state => state.session.userName,
    (state, props) => props.bookId,
    state => state.rents.wishes
  ],
  (rents, localRents, userName, bookId, wishes) => {
    const status = {
      canRent: false,
      canWish: false,
      rentedByUser: false,
      rentedByOther: false
    };
    if (localRents.length > 0) {
      if (localRents.find(id => id === bookId)) {
        status.rentedByUser = true;
        return status;
      }
    }
    if (wishes.length > 0) {
      if (wishes.find(wish => wish.book.id === bookId)) {
        status.canRent = false;
        status.canWish = true;
        return status;
      }
    }
    if (rents) {
      const lastRent = rents[rents.length - 1];
      const lastRentTo = lastRent.to;
      const lastRentUserName = lastRent.user.email;
      const today = moment().format('YYYY-MM-DD');

      if (today > lastRentTo) {
        status.canRent = true;
      } else if (userName !== lastRentUserName) {
        status.rentedByOther = true;
        status.canWish = true;
      } else {
        status.rentedByUser = true;
      }
      return status;
    }
    return status;
  }
);

const mapStateToProps = (state, props) => ({
  isLoading: state.rents.isLoading,
  status: getStatus(state, props),
  localRents: state.rents.localRents,
  userId: state.session.userId
});

const mapDispatchToProps = dispatch => ({
  handleRent: localRents => dispatch(rentsActions.saveRents(localRents)),
  handleWish: (bookId, user) => dispatch(rentsActions.saveWish(bookId, user))
});

RentContainer.propTypes = {
  handleRent: PropTypes.func.isRequired,
  bookId: PropTypes.number.isRequired,
  localRents: PropTypes.arrayOf(PropTypes.number),
  userId: PropTypes.string.isRequired,
  handleWish: PropTypes.func.isRequired,
  status: PropTypes.shape({
    canRent: PropTypes.bool.isRequired,
    canWish: PropTypes.bool.isRequired,
    rentedByUser: PropTypes.bool.isRequired,
    rentedByOther: PropTypes.bool.isRequired
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader(RentContainer));