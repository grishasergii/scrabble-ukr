import React from 'react';
import styles from './Letter.css';

const letter = (props) => {
  let onClick = null;
  const classes = [styles.Letter];

  if (props.selectable === true) {
    onClick = props.clicked;
    classes.push(styles.Selectable);
  }

  if (props.selected === true) {
    classes.push(styles.Selected);
  }

  return (
    <span onClick={onClick} className={classes.join(' ')}>
      {props.letter}<sup>{props.value}</sup>
    </span>
  );
}

export default letter;