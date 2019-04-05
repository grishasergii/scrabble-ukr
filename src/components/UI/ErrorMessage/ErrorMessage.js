import React from 'react';
import Modal from '../Modal/Modal';

const errorMessage = (props) => {
  return (
    <Modal>
      <p>
        {props.children}
      </p>
      <p>
        <button onClick={props.closeMessageHandler}>ok</button>
      </p>
    </Modal>
  );
}

export default errorMessage;