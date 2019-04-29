import indexToRowCol from '../board/indexToRowCol';
import isWordConnected from './isWordConnected';
import getWordIndicesFromAnchor from './getWordIndicesFromAnchor';

const isValidWordPlacement = (tiles, boardSize, placedTilesIndices, dictionary) => {
  // are there any letters placed by the player?
  if (placedTilesIndices.length === 0) {
    return {
      isValid: false,
      errorMessage: 'Place some letters!'
    };
  }

  const tilesLength = tiles.length;

  // are all letters in the same row or column?
  const rows = new Set([]);
  const cols = new Set([]);
  const placedTilesIndicesLength = placedTilesIndices.length;
  for (let i = 0; i < placedTilesIndicesLength; i++) {
    const {row, col} = indexToRowCol(placedTilesIndices[i], boardSize)
    rows.add(row);
    cols.add(col);   
  }

  if (rows.size > 1 && cols.size > 1) {
    return {
      isValid: false,
      errorMessage: 'All letters must be placed in the same row or column'
    };
  }

  // do all placed letters form a continious sequence?
  let step = 0;
  let stepAllWords = 0;
  if (rows.size === 1) {
    step = 1;
    stepAllWords = boardSize;
  }
  if (cols.size === 1) {
    step = boardSize;
    stepAllWords = 1;
  }
  if (cols.size === 1 && rows.size === 1) {
    const steps = [1, -1, boardSize, -boardSize];
    const indices = steps.map(s => s + placedTilesIndices[0]);
    for (let i=0; i<4; i++) {
      const index = indices[i];
      if (index < 0 || index >= tilesLength) {
        continue;
      }
      if (tiles[index].letter !== null && tiles[index].letter !== undefined) {
        if (tiles[index].letter.alreadyPlayed === true) {
          step = Math.abs(steps[i]);
          if (step === 1) {
            stepAllWords = boardSize;
          } else {
            stepAllWords = 1;
          }
          break;
        } 
      }
    }
  }

  const stop = placedTilesIndices[placedTilesIndices.length-1] + step;
  for (let i = placedTilesIndices[0]; i < stop; i += step) {
    if (tiles[i].letter === null || tiles[i].letter === undefined) {
      return {
        isValid: false,
        errorMessage: 'there are gaps in the letter sequence'
      };         
    }
  }

  // is placed letter sequence a valid word?
  const lettersIndices = getWordIndicesFromAnchor(tiles, placedTilesIndices[0], step, boardSize);
  const lettersSequence = lettersIndices.map(i => tiles[i].letter.letter.toLowerCase()).join('');

  if (dictionary.has(lettersSequence) === false) {
    return {
      isValid: false,
      errorMessage: `I do not know such word as ${lettersSequence}`
    };   
  }
  
  // is word connected to already placed tiles?
  const isConnected = isWordConnected(placedTilesIndices, step, stepAllWords, tiles);
  if (isConnected === false) {
    return {
      isValid: false,
      errorMessage: 'Sorry, word not connected'
    };
  }

  // are all adjacent words valid?
  const wordIndices = [];
  for (let i = 0; i < placedTilesIndicesLength; i++) {
    const word = getWordIndicesFromAnchor(tiles, placedTilesIndices[i], stepAllWords, boardSize);
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
    return {
      isValid: false,
      errorMessage: `I do not know such word as "${invalidWords[0]}"`
    };
  }

  if (invalidWords.length > 1) {
    return {
      isValid: false,
      errorMessage: `I do not know the following words "${invalidWords.join(', ')}"`
    };
  }

  return {
    isValid: true,
    errorMessage: null
  }
}

export default isValidWordPlacement;