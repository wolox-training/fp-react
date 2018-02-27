import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import wbooksIcon from '../../assets/wbooks_logo.svg';
import addIcon from '../../assets/add_book.svg';

import ProfileDropdown from './components/ProfileDropdown/index.js';
import NotificationDropdown from './components/NotificationDropdown/index.js';
import styles from './styles.scss';

class Navbar extends Component {
  render() {
    return (
      <div className={styles.navbarContainer}>
        <div className={styles.wbookContainer}>
          <Link to='/dashboard'>
            <img src={wbooksIcon} className={styles.navbarIcon} alt='wbooksIcon'/>
          </Link>
        </div>
        <div  className={styles.iconsContainer}>
          <NotificationDropdown/>
          <img src={addIcon} className={styles.buttonIcon} alt='addIcon'/>
          <ProfileDropdown/>
        </div>
      </div>
    );
  }
}

export default Navbar;
