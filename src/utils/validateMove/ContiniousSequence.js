import ValidationRule from '../validation/ValidationRule';

class ContiniousSequence extends ValidationRule {
  isSatisfied({tiles, placedTilesIndices, boardSize, direction}) {
    let step = 1;
    if (direction === 'vertical') {
      step = boardSize;
    } 

    const stop = placedTilesIndices[placedTilesIndices.length-1] + step;
    for (let i = placedTilesIndices[0]; i < stop; i += step) {
      if (tiles[i].letter === null || tiles[i].letter === undefined) {
        this.errorMessage = 'there are gaps in the letter sequence';
        return false;         
      }
    }

    return true;
  }
}

export default ContiniousSequence;