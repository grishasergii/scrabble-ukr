import React from 'react';
import styles from './Letter.css';

const letter = (props) => {
  return (
    <span className={styles.Letter}>
      {props.letter}<sup>{props.value}</sup>
    </span>
  );
}

export default letter;