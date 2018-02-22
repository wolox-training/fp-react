import React, { Component } from 'react';
import PropTypes from 'prop-types';

import searchSvg from '../../assets/search.svg';

import styles from './styles.scss';

class SearchInput extends Component {
  state = {value: ''};
  defaultValue = 'Buscar...';

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.onInputChange(event.target.value);
  }

  handleFocus = () => {
    this.setState({ value: '' });
  }

  handleClick = () => {
    this.props.onInputChange(this.state.value);
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <input className={`${styles.searchInput} ${styles.inputText}`} value={this.state.value} onChange={this.handleChange} onFocus={this.handleFocus} placeholder={this.defaultValue}></input>
        <div className={styles.iconContainer}>
          <img src={searchSvg} className={styles.searchIcon} onClick={this.handleClick} alt='searchIcon' />
        </div>
      </div>
    );
  }
}

SearchInput.propTypes = {
  onInputChange: PropTypes.func.isRequired
};

export default SearchInput;
