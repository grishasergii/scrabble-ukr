import React from 'react';
import { FormattedMessage } from 'react-intl';
import ValidationRule from '../validation/ValidationRule';

class AnyPlacedTiles extends ValidationRule {
  isSatisfied({placedTilesIndices = []} = {}) {
    if (placedTilesIndices.length === 0) {
    this.errorMessage = <FormattedMessage id='place-some-tiles' defaultMessage='Place some tiles!'/>;
      return false;
    }

    return true;
  }
}

export default AnyPlacedTiles;