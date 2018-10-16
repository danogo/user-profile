import React from 'react';
import styles from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = (props) => {
  const { onBtnClick, showModal  } = props;
  const modalClassName = showModal ? styles.showModal : styles.hideModal;

  return (
    <div className={modalClassName}>
      <div className={styles.modalBox}>
        <input id='inputModal' value={window.location.href} onFocus={e => e.target.select()} readOnly/>
        <button onClick={onBtnClick}>
          <FontAwesomeIcon icon={['fas', 'times']} color='#FFFFFF'/>
        </button>
      </div>
    </div>
  );
} 

export default Modal;