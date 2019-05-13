import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

const errorMessage = (props) => {
  return (
    <Modal>
      <p>
        {props.children}
      </p>
      <p>
        <Button 
          clickHandler={props.closeMessageHandler}
          caption='Ok'
        />
      </p>
    </Modal>
  );
}

export default errorMessage;