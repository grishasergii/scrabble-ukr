import React from 'react';
import Card from '../../UI/Card/Card';

const score = (props) => {
  return (
    <Card heading={'Score'}>
      <p>You: {props.playerScore}</p>
      <p>Computer: {props.computerScore}</p>
    </Card>
  );
}

export default score;