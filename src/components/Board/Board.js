import React from 'react';
import styles from './Board.css'
import Square from './Square/Square';
import Bonus from './Square/Bonus/Bonus';

const board = (props) => {
  const squares = props.squares.map(sq => <Square><Bonus type={sq.bonus}/></Square>);
  return (
    <div className={styles.Board}>
      {squares}
    </div>
  );
}

export default board;