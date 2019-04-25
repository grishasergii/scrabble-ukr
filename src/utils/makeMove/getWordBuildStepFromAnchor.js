import indexToRowCol from '../board/indexToRowCol';

const getWordBuildStepFromAnchor = (tiles, boardSize, anchorIndex) => {
  let rowCol = indexToRowCol(anchorIndex, boardSize);
  const anchorRow = rowCol.row;
  const anchorCol = rowCol.col;

  const steps = [1, -1, boardSize, -boardSize];
  const tilesLength = tiles.length;
  for (let step of steps) {
    const index = anchorIndex + step;
    const {row, col} = indexToRowCol(index, boardSize);

    if (row !== anchorRow && col !== anchorCol) {
      continue;
    }

    if (index < 0  || index >= tilesLength) {
      continue;
    }

    if (tiles[index].letter !== null && tiles[index].letter !== undefined) {
      return Math.abs(step);
    }
  }

  return 1;
};

export default getWordBuildStepFromAnchor;