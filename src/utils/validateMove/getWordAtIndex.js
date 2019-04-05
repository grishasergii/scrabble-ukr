const getWordAtIndex = (index, step, squares) => {
  const wordIndices = [];

  // go up
  let i = index - step;
  while (true) {
    if (i < 0 || squares[i].letter === null || squares[i].letter === undefined) {
      break;
    }
    wordIndices.push(i);
    i = i + step
  }

  // go down
  i = index + step;
  const numSquares = squares.length;
  while (true) {
    if (i >= numSquares || squares[i].letter === null || squares[i].letter === undefined) {
      break;
    }
    wordIndices.push(i);
    i = i + step;
  }

  if (wordIndices.length > 0) {
    wordIndices.push(index);
  }

    return wordIndices.sort((a, b) => a - b);
}

export default getWordAtIndex;