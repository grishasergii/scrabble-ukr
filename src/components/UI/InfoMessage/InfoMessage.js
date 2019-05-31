import React from 'react';
import styles from './InfoMessage.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

const infoMessage = (props) => {
  return (
    <Modal>
      <div className={styles.InfoMessage}>
        <p>
          {props.children}
        </p>
        <br></br>
        <Button 
          clickHandler={props.closeMessageHandler}
          caption='Ok'
        />
      </div>
    </Modal>
  );
}

export default infoMessage;