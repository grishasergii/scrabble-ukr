const getAnchors = (squares, stepVertical) => {
  const anchorIndices = new Set();
  const squaresLength = squares.length;
  const steps = [1, -1, stepVertical, -stepVertical];
  for (const [index, square] of squares.entries()) {
    let letter = square.letter;

    if (letter === null || letter === undefined) {
      continue;
    }

    for (let step of steps) {
      const i = index + step;
      if (i < 0 || i >= squaresLength) {
        continue;
      }

      if (i % stepVertical !== index % stepVertical && Math.floor(i / stepVertical) !== Math.floor(index / stepVertical)) {
        continue;
      }

      if (squares[i].letter === null || squares[i].letter === undefined) {
        anchorIndices.add(i);
      }
    }
  }

  if (anchorIndices.size === 0) {
    return Math.ceil(squaresLength / 2);
  }

  return anchorIndices;
}

export default getAnchors;