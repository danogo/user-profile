import React from 'react';
import styles from './Comments.module.css';
import picture from './pic.jpg';
import moment from 'moment';

// configure moment to use single letter date format
moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s',
      s:  'a few seconds',
      ss: '%ss',
      m:  'a minute',
      mm: '%dm',
      h:  'an hour',
      hh: '%dh',
      d:  'a day',
      dd: '%dd',
      M:  'a month',
      MM: '%dM',
      y:  'a year',
      yy: '%dY'
    }
  });

const Comments = (props) => {
  const { onInput, onToggleComments, comments, showComments } = props;

  const sortComments = commentsArray => {
    return commentsArray.sort((comA, comB) => comA.date - comB.date);
  }

  const renderComments = commentsArray => {
    return commentsArray.map( (el, i) => {
      return (
        <li key={i}>
          <div className={styles.authorBox}>
            <img src={picture} alt='author of the comment'/>
            <div className={styles.author}>
              <span className={styles.name}>{el.username}</span>
              <span className={styles.date}>{moment(parseInt(el.date, 10)).fromNow()}</span>
            </div>
          </div>
          <p className={styles.content}>{el.content}</p>
        </li>
      )
    });
  }

  return (
    <div className={ showComments ? styles.Comments : `${styles.CommentsHidden} ${styles.Comments}`}>
      <button onClick={onToggleComments} className={styles.btnComments }>
        {showComments ? 'Hide comments' : 'Show comments'} 
        <span className={styles.numOfCom}>{`(${comments.length})`}</span>
      </button>
      <ul id="comList" tabIndex={showComments ? '0' : '-1'}>
        {renderComments(sortComments(comments))} 
      </ul>
      <div className={styles.inputBox}>
        <input id='inputComment' onKeyPress={onInput} type='text' className={styles.inputComment} placeholder='Add a comment'/>
      </div>
    </div>
  ); 
};

export default Comments;

