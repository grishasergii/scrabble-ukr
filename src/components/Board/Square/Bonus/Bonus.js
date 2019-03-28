import React from 'react';

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
    default:
      bonusText = null;
      color = null;
  }

  return (
    <span style={{color: color}}>{bonusText}</span>
  );
}

export default bonus;