import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

const confirm = (props) => {
  let question = 'Are you sure?';
  if (props.question !== null && props.question !== undefined) {
    question = props.question;
  }
  return (
    <Modal>
      <p>{question}</p>
      <Button 
        clickHandler={props.yesClickHandler}
        caption='Yes'
      />
      <Button 
        clickHandler={props.noClickHandler}
        caption='No'
      />
    </Modal>
  );
}

export default confirm;