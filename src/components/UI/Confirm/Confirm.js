import React from 'react';
import Modal from '../Modal/Modal';

const confirm = (props) => {
  let question = 'Are you sure?';
  if (props.question !== null && props.question !== undefined) {
    question = props.question;
  }
  return (
    <Modal>
      <p>{question}</p>
      <button onClick={props.yesClickHandler}>Yes</button>
      <button onClick={props.noClickHandler}>No</button>
    </Modal>
  );
}

export default confirm;