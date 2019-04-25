import indexToRowCol from '../board/indexToRowCol';
import isWordConnected from './isWordConnected';
import getWordIndicesFromAnchor from './getWordIndicesFromAnchor';

const isValidFormPlacement = (tiles, boardSize, placedTilesIndices, dictionary) => {
  // are there any letters placed by the player?
  if (placedTilesIndices.length === 0) {
    return {
      isValid: false,
      errorMessage: 'Place some letters!'
    };
  }

  // are all letters in the same row or column?
  const rows = new Set([]);
  const cols = new Set([]);
  placedTilesIndices.forEach(i => {
    const {row, col} = indexToRowCol(i, boardSize)
    rows.add(row);
    cols.add(col);
  });

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

  for (let i = placedTilesIndices[0]; i < placedTilesIndices[placedTilesIndices.length-1] + step; i += step) {
    if (tiles[i].letter === null || tiles[i].letter === undefined) {
      return {
        isValid: false,
        errorMessage: 'there are gaps in the letter sequence'
      };         
    }
  }

  // is word connected
  const isConnected = isWordConnected(placedTilesIndices, step, stepAllWords, tiles);
  if (isConnected === false) {
    return {
      isValid: false,
      errorMessage: 'Sorry, word not connected'
    };
  }

  const wordIndices = [];
  // get formed word
  let i = placedTilesIndices[0];
  const formedWordIndices = [];
  const startRowCol = indexToRowCol(i, boardSize);
  while (true) {
    const {row, col} = indexToRowCol(i, boardSize);
    if (row !== startRowCol.row && col !== startRowCol.col) {
      break;
    }

    if (tiles[i].letter === null || tiles[i].letter === undefined) {
      break;
    }

    formedWordIndices.push(i);

    i =+ step;
  }

  wordIndices.push(formedWordIndices);

  // get all adjacent words
  placedTilesIndices.forEach(i => {
    const word = getWordIndicesFromAnchor(tiles, i, stepAllWords, boardSize);
    if (word.length > 0) {
      wordIndices.push(word);
    }
  });

  // validate all words
  const invalidWords = [];
  wordIndices.filter(wi => wi.length > 0).forEach(wi => {
    const word = wi.map(i => tiles[i].letter.letter).join('').toLowerCase();
    const sortedLetters = word.split('').sort().join('');
    const possibleWords = dictionary[sortedLetters];
    let isValid = false;
    if (possibleWords !== null && possibleWords !== undefined) {
      for (const w of possibleWords) {
        if (w === word) {
          isValid = true;
          break;
        }
      }
    }
    if (isValid === false) {
      invalidWords.push(word);
    }
  });

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

export default isValidFormPlacement;