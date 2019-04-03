import React from 'react';
import styles from './Board.css'
import Square from './Square/Square';
import Bonus from './Square/Bonus/Bonus';
import Letter from './Letter/Letter';

const board = (props) => {
  const squares = props.squares.map((sq, sqIndex) => {
    let letter = null;
    let squareClick = ()  => props.squareClick(sqIndex);

    if (sq !== null && sq.letter !== null && sq.letter !== undefined) {
      letter = (
        <Letter 
          letter={sq.letter.letter} 
          value={sq.letter.value}
          clicked={() => props.letterClick(sq.letter, sqIndex, 'board')}
          selected={sq.letter.selected}
          selectable={true} />
      );

      squareClick = null;
    }
    let bonus = null;
    if (sq !== null) {
      bonus = <Bonus type={sq.bonus}/>;
    }
    return(
      <Square key={sqIndex} click={squareClick}>
        {bonus}
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