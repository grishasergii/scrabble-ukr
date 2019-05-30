import React from 'react';
import Card from '../../UI/Card/Card';
import { FormattedMessage } from 'react-intl';

const tilesLeft = (props) => {
  return (
    <Card>
      {<FormattedMessage id='tiles-left' defaultMessage='ScoTiles left'/>}: {props.tilesCount}
    </Card>
  );
}

export default tilesLeft;