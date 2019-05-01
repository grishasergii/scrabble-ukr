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

  if (props.highlighted === true) {
    classes.push(styles.Highlighted);
  }

  const spanStyle = {
    borderColor: props.color
  };

  return (
    <div onClick={onClick} className={classes.join(' ')} style={spanStyle}>
      {props.letter}<sup>{props.value}</sup>
    </div>
  );
}

export default letter;