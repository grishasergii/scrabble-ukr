import ValidationRule from '../validation/ValidationRule';
import getWordIndicesFromAnchor from './getWordIndicesFromAnchor';
import React from 'react';
import { FormattedMessage } from 'react-intl';

class AdjacentWordsAreValid extends ValidationRule {
  isSatisfied({tiles, placedTilesIndices, direction, boardSize, dictionary}) {
    let step = 1;
    if (direction === 'horizontal') {
      step = boardSize;
    }

    const placedTilesIndicesLength = placedTilesIndices.length;
    const wordIndices = [];
    for (let i = 0; i < placedTilesIndicesLength; i++) {
      const word = getWordIndicesFromAnchor(tiles, placedTilesIndices[i], step, boardSize);
      if (word.length > 0) {
        wordIndices.push(word);
      }  
    }
    
    const invalidWords = [];
    const wordIndicesLength = wordIndices.length;
    for (let i=0; i < wordIndicesLength; i ++) {
      if (wordIndices[i].length === 0) {
        continue;
      }

      const word = wordIndices[i].map(i => tiles[i].letter.letter).join('').toLowerCase();
      if (dictionary.has(word) === false) {
        invalidWords.push(word);
      }
    }
    
    if (invalidWords.length === 1) {
      this.errorMessage = <FormattedMessage id='unknown-word' defaultMessage='Word {unknownWord} is not in my dictionary!' values={{unknownWord: invalidWords[0]}}/>;
      return false;
    }

    if (invalidWords.length > 1) {
      this.errorMessage = <FormattedMessage id='unknown-words' defaultMessage='Words "{unknownWords}" are not in my dictionary!' values={{unknownWord: invalidWords.join(', ')}}/>;
      return false;
    }

    return true;
  }
}

export default AdjacentWordsAreValid;