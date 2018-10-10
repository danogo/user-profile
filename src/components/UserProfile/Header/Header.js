import React from 'react';
import styles from './Header.module.css';
import picture from './pic.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = (props) => {
  const { onHeartClick, onFollowClick, likes, following, followers, isFollowed, isLiked, onShareClick } = props;
  return (
      <div className={styles.Header}>
        <FontAwesomeIcon onClick={onShareClick} className={styles.shareIcon} icon='share-square' tabIndex='0'/>
        <div className={styles.userInfo}>
          <img src={picture} alt='user'/>
          <div>
            <h1>Harvey Specter</h1>
            {
              isLiked
              ? <FontAwesomeIcon onClick={onHeartClick} className={styles.heartIcon} icon={['fas', 'heart']} color='#FFA640'  tabIndex='0'/>
              : <FontAwesomeIcon onClick={onHeartClick} className={styles.heartIcon} icon={['far', 'heart']} color='#D9D9D9'  tabIndex='0'/>
            }
            <h2>New York, USA</h2>
          </div>
        </div>
        <div className={styles.userSocials}>
          <ul id="ul">
            <li>
              <p className={styles.socialsNumber}>{likes}</p>
              <p>Likes</p>
            </li>
            <span className={styles.divider}></span>
            <li>
              <p className={styles.socialsNumber}>{following}</p>
              <p>Following</p>
            </li>
            <span className={styles.divider}></span>
            <li>
              <p className={styles.socialsNumber}>{followers}</p>
              <p>Followers</p>
            </li>
          </ul>
          {
            isFollowed 
              ? <button onClick={onFollowClick} className={`${styles.btnFollow} ${styles.btnUnfollow}`}>UNFOLLOW</button>
              : <button onClick={onFollowClick} className={styles.btnFollow}>FOLLOW</button>
          }
        </div>
      </div>
    )
}

export default Header;