import React from 'react';
import styles from './Square.css';

const square = (props) => {
  let classes = [styles.Square];
  if (props.click !== null && props.click !== undefined) {
    classes.push(styles.Selectable);
  }

  return (
    <div onClick={props.click} className={classes.join(' ')}>
      {props.children}
    </div>
  );
}

export default square;