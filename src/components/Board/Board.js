import React from 'react';
import styles from './Board.css'
import Square from './Square/Square';
import Bonus from './Square/Bonus/Bonus';
import Letter from './Letter/Letter';

const board = (props) => {
  const squares = props.squares.map((sq, sqIndex) => {
    let letter = null;
    if (sq.letter !== undefined) {
      letter = <Letter letter={sq.letter.letter} value={sq.letter.value} />
    }
    return(
      <Square key={sqIndex} click={() => props.squareClick(sqIndex)}>
        <Bonus type={sq.bonus}/>
        {letter}
      </Square>
    );
  });
  return (
    <div className={styles.Board}>
      {squares}
    </div>
  );
}

export default board;