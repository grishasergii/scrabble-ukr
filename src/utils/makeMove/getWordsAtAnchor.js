import indexToRowCol from '../board/indexToRowCol';
import Combinatorics from 'js-combinatorics';

const getWordsAtAnchor = (tiles, rack, dictionary, anchorIndex, boardSize, step) => {
  // if (anchors.length === 0) {
  //   return null;
  // }

  // const anchorIndex = anchors[Math.floor(Math.random() * anchors.length)];

  const rackLetters =  rack.map(x => x.letter);

  const rowCol = indexToRowCol(anchorIndex, boardSize);
  const anchorRow = rowCol.row;
  const anchorCol = rowCol.col;

  const placeholderBack = getPlaceholder(tiles, -step, anchorIndex, anchorRow, anchorCol, boardSize);
  const placeholderForward = getPlaceholder(tiles, step, anchorIndex, anchorRow, anchorCol, boardSize);
  placeholderForward.unshift(null);
  const placeholderAnchorIndex = placeholderBack.length;
  const placeHolder = placeholderBack.reverse().concat(placeholderForward);
  const placeHolderLetters = placeHolder.filter(x => x !== null);

  const letters = rackLetters.concat(placeHolderLetters);

  const maxWordLength = Math.min(placeHolder.length, letters.length);

  const candidates = [];
  for (let length = maxWordLength; length > 1; length--) {
    const combinations = Combinatorics.combination(letters, length);
    let combination;
    const seenCombinations = new Set();
    while (combination = combinations.next()) {
      combination = combination.sort().join('');
      if (seenCombinations.has(combination) === true) {
        continue;
      }
      seenCombinations.add(combination);

      const words = dictionary[combination];
      if (words === null || words === undefined) {
        continue;
      }
      for (const word of words) {
        const indicesInPlaceholder = getIndicesInPlaceholder(placeHolder, word);
        if (indicesInPlaceholder === null) {
          continue;
        }

        if (indicesInPlaceholder.length !== word.length) {
          continue;
        }

        const indicesInBoard = indicesInPlaceholder.map(i => anchorIndex + (i - placeholderAnchorIndex) * step);

        const candidateWord = [];
        for (let i = 0; i < indicesInBoard.length; i++) {
          candidateWord.push({
            index: indicesInBoard[i],
            letter: word[i]
          })
        }

        candidates.push(candidateWord);
      }
    }
  }

  return candidates;  
};

const getIndicesInPlaceholder = (placeholder, word) => {
  for (let i = 0; i < placeholder.length - word.length; i++) {
    const placeholderSlice = placeholder.slice(i, i+word.length);
    let canFit = true;
    for (let j = 0; j < word.length; j++) {
      if (placeholderSlice[j] === null) {
        continue;
      }

      if (word[j] !== placeholderSlice[j]) {
        canFit = false;
        break;
      }
    }

    if (canFit === true) {
      const indices = [];
      for (let l = i; l < word.length; l++) {
        indices.push(l);
      }
      return indices;
    }
  }

  return null;
}

const getPlaceholder = (squares, step, anchorIndex, anchorRow, anchorCol, boardSize) => {
  let index = anchorIndex + step;
  const rowCol = indexToRowCol(index, boardSize);
  let row = rowCol.row;
  let col = rowCol.col;

  const placeholder = [];
  while (row === anchorRow || col === anchorCol) {
    if (squares[index].letter === null || squares[index].letter === undefined) {
      placeholder.push(null);
    } else {
      placeholder.push(squares[index].letter.letter);
    }

    index = index + step;
    const rowCol = indexToRowCol(index, boardSize);
    row = rowCol.row;
    col = rowCol.col;
  }

  return placeholder;
};

export default getWordsAtAnchor;