import React from 'react';
import styles from './Bonus.css';

const bonus = (props) => {
  let bonusText = null;
  let style = null;

  switch(props.bonus.type) {
    case('3xWS'):
      bonusText = 'TW';
      style = {backgroundColor: '#80201d'};
      break;
    case('2xWS'):
      bonusText = 'DW';
      style = {backgroundColor: '#d15d30'};
      break;
    case('3xLS'):
      bonusText = 'TL';
      style = {backgroundColor: '#294f80'};
      break;
    case('2xLS'):
      bonusText = 'DL';
      style = {backgroundColor: '#3d8029'};
      break;
    case('start'):
      style = {backgroundColor: '#d6c755', fontSize: '2em'};
      bonusText = String.fromCharCode(9734);
      break;
    default:
      bonusText = null;
      style = null;
  }

  return (
    <div className={styles.Bonus} style={style}>
      {bonusText}
    </div>
  );
}

export default bonus;