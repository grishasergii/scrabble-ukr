import React from 'react';
import Card from '../../UI/Card/Card';

const tilesLeft = (props) => {
  return (
    <Card>
      Tiles left: {props.tilesCount}
    </Card>
  );
}

export default tilesLeft;