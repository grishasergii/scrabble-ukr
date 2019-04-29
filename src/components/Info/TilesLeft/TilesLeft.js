import React from 'react';
import styles from './TilesLeft.css'

const tilesLeft = (props) => {
  return (
    <div className={styles.TilesLeft}>
      Tiles left: {props.tilesCount}
    </div>
  );
}

export default tilesLeft;