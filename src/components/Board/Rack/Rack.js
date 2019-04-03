import React from 'react';
import styles from './Rack.css';
import Square from '../Square/Square';
import Letter from '../Letter/Letter';


const rack = (props) => {
  const squares = props.letters.map((l, index) => {
    let letter = null;
    if (l !== null) {
      letter = (
        <Letter 
          selectable={props.rackSelectable}
          letter={l.letter} 
          value={l.value}
          selected={l.selected}
          clicked={() => props.letterClick(l, index, props.selectedFrom)} />
      );
    }
    return (<Square key={index}> {letter} </Square>);
  })
  for (let i = 0; i < props.size; i++) {
    squares.push(<Square />);
  }

  return (
    <div className={styles.Rack}>
      {squares}
    </div>
  );
}

export default rack;