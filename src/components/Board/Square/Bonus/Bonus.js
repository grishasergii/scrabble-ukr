import React from 'react';
import styles from './Bonus.css';

const bonus = (props) => {
  let bonusText = null;
  let color = null;

  switch(props.type) {
    case('3xWS'):
      bonusText = 'TW';
      color = 'red';
      break;
    case('2xWS'):
      bonusText = 'DW';
      color= 'pink';
      break;
    case('3xLS'):
      bonusText = 'TL';
      color = 'blue';
      break;
    case('2xLS'):
      bonusText = 'DL';
      color = 'cyan';
      break;
    case('start'):
      color = 'yellow';
      break;
    default:
      bonusText = null;
      color = null;
  }

  return (
    <div className={styles.Bonus} style={{backgroundColor: color}}>
      
    </div>
  );
}

export default bonus;