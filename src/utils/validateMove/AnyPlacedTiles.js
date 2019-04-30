import ValidationRule from '../validation/ValidationRule';

class AnyPlacedTiles extends ValidationRule {
  isSatisfied({placedTilesIndices = []} = {}) {
    if (placedTilesIndices.length === 0) {
      this.errorMessage = 'Place some tiles!';
      return false;
    }

    return true;
  }
}

export default AnyPlacedTiles;