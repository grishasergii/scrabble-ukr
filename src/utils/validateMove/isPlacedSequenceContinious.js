const isPlacedSequenceContinious = (placedIndices, step, squares) => {
  if (placedIndices.length === 0) {
    return true;
  }

  let index = placedIndices[0];
  const indices = new Set(placedIndices);

  while (index < squares.length && indices.size > 0) {
    if (squares[index].letter === null || squares[index].letter === undefined) {
      break;
    }

    indices.delete(index);
    index = index + step;
  }

  if (indices.size === 0) {
    return true;
  }

  return false;
}

export default isPlacedSequenceContinious;