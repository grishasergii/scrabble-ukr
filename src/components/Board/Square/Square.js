import React from 'react';
import styles from './Square.css';

const square = (props) => {
  return (
    <div onClick={props.click} className={styles.Square}>
      {props.children}
    </div>
  );
}

export default square;