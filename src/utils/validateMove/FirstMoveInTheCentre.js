import ValidationRule from '../validation/ValidationRule';

class FirstMoveInTheCentre extends ValidationRule {
  isSatisfied({tiles, placedTilesIndices, boardSize}) {
    let isFirstMove = true;
    for (const tile of tiles) {
      if (tile.letter === null || tile.letter === undefined) {
        continue;
      }

      if (tile.letter.alreadyPlayed === true) {
        isFirstMove = false;
        break;
      }
    }

    if (isFirstMove === false) {
      return true;
    }

    const centreIndex = Math.ceil(boardSize * boardSize / 2.0);
    if (placedTilesIndices.indexOf(centreIndex) === -1) {
      this.errorMessage = 'First move must start in the centre!';
      return false;
    }

    return true;
  }
}

export default FirstMoveInTheCentre;