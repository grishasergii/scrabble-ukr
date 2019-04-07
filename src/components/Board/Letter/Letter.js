import React from 'react';
import styles from './Letter.css';

const letter = (props) => {
  let onClick = null;
  const classes = [styles.Letter];

  let alreadyPlayed = false;
  if (props.alreadyPlayed === true) {
    alreadyPlayed = true;
  }

  if (props.selectable === true && alreadyPlayed === false) {
    onClick = props.clicked;
    classes.push(styles.Selectable);
  }

  if (alreadyPlayed === true) {
    classes.push(styles.AlreadyPlayed);
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