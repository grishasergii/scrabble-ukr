import React from 'react';
import styles from './Rack.css';
import Square from '../Square/Square';
import Letter from '../Letter/Letter';


const rack = (props) => {
  const squares = props.letters.map(l => {
    return (<Square>
      <Letter letter={l.letter} value={l.value} />
    </Square>);
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