import React from 'react';
import styles from './Letter.css';

const letter = ({alreadyPlayed, selectable, clicked, selected, highlighted, letter, value}) => {
  let onClick = null;
  const classes = [styles.Letter];
  alreadyPlayed = alreadyPlayed === true ? true : false;

  if (selectable === true && alreadyPlayed === false) {
    onClick = clicked;
    classes.push(styles.Selectable);
  }

  if (selected === true) {
    classes.push(styles.Selected);
  }

  if (highlighted === true) {
    classes.push(styles.Highlighted);
  }

  return (
    <div onClick={onClick} className={classes.join(' ')}>
      {letter}<sub>{value}</sub>
    </div>
  );
}

export default letter;