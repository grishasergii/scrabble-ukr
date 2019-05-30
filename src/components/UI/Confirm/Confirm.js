import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { FormattedMessage } from 'react-intl';

const confirm = (props) => {
  let question = <FormattedMessage id='are-you-sure' defaultMessage='Are you sure?'/>;
  if (props.question !== null && props.question !== undefined) {
    question = props.question;
  }
  return (
    <Modal>
      <p>{question}</p>
      <Button 
        clickHandler={props.yesClickHandler}
        caption={<FormattedMessage id='yes' defaultMessage='Yes'/>}
      />
      <Button 
        clickHandler={props.noClickHandler}
        caption={<FormattedMessage id='no' defaultMessage='No'/>}
      />
    </Modal>
  );
}

export default confirm;