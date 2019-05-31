import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import background from '../../../assets/error-bg.jpeg';
import styles from './ErrorMessage.css';

const errorMessage = (props) => {
  const style = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
  return (
    <Modal>
      <div className={styles.ErrorMessage} style={style}>
        <span className={styles.ErrorText}>
          {props.children}
        </span>

        <Button 
          clickHandler={props.closeMessageHandler}
          caption='Ok'
        />
      </div>
    </Modal>
  );
}

export default errorMessage;