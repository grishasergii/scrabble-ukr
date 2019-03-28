import React from 'react';
import styles from './Square.css';

const square = (props) => {
  return (
    <div className={styles.Square}>
      {props.children}
    </div>
  );
}

export default square;