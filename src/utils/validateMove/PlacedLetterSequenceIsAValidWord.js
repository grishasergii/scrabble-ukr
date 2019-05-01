import ValidationRule from '../validation/ValidationRule';
import getWordIndicesFromAnchor from './getWordIndicesFromAnchor';

class PlacedLetterSequenceIsAValidWord extends ValidationRule {
  isSatisfied({tiles, placedTilesIndices, direction, boardSize, dictionary}) {
    let step = 1;
    if (direction === 'vertical') {
      step = boardSize;
    }

    const lettersIndices = getWordIndicesFromAnchor(tiles, placedTilesIndices[0], step, boardSize);
    const lettersSequence = lettersIndices.map(i => tiles[i].letter.letter.toLowerCase()).join('');

    if (dictionary.has(lettersSequence) === false) {
      this.errorMessage = `I do not know such word as ${lettersSequence}`;
      return false;   
    }
    
    return true;
  }
}

export default PlacedLetterSequenceIsAValidWord;