import React from 'react';
import styles from './Score.css';

const score = (props) => {
  return (
    <div className={styles.Score}>
      <h1>Score</h1>
      <p>You: {props.playerScore}</p>
      <p>Computer: {props.computerScore}</p>
    </div>
  );
}

export default score;