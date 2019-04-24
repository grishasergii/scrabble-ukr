const getAnchorIndices = (tiles, stepVertical) => {
  const anchorIndices = new Set();
  const squaresLength = tiles.length;
  const steps = [1, -1, stepVertical, -stepVertical];
  for (const [index, square] of tiles.entries()) {
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

      if (tiles[i].letter === null || tiles[i].letter === undefined) {
        anchorIndices.add(i);
      }
    }
  }

  if (anchorIndices.size === 0) {
    return [Math.ceil(squaresLength / 2)];
  }

  return anchorIndices;
}

export default getAnchorIndices;