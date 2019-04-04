const getWordAtIndex = (index, step, squares) => {
  const wordIndices = [];

  // go up
  let i = index - 1;
  while (true) {
    if (i < 0 || squares[i].letter === null || squares[i].letter === undefined) {
      break;
    }
    wordIndices.push(i);
  }

  // go down
  let i = index + 1;
  const numSquares = squares.length;
  while (true) {
    if (i >= numSquares || squares[i].letter === null || squares[i].letter === undefined) {
      break;
    }
    wordIndices.push(i);
  }

  wordIndices.push(index);
  return wordIndices.sort();
}

export default getWordAtIndex;