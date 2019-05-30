import React from 'react';
import Card from '../../UI/Card/Card';
import { FormattedMessage } from 'react-intl';

const score = (props) => {
  return (
    <Card heading={<FormattedMessage id='score' defaultMessage='Score'/>}>
      <p>{<FormattedMessage id='you' defaultMessage='You'/>}: {props.playerScore}</p>
      <p>{<FormattedMessage id='computer' defaultMessage='Computer'/>}: {props.computerScore}</p>
    </Card>
  );
}

export default score;