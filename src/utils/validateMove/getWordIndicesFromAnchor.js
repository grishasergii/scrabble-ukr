import indexToRowCol from '../board/indexToRowCol';

const getWordIndicesFromAnchor = (tiles, anchorIndex, step, boardSize) => {
  const indices = [];
  const rowCol = indexToRowCol(anchorIndex, boardSize);
  const startRow = rowCol.row;
  const startCol = rowCol.col;
  const steps = [-step, step];
  const tilesLength = tiles.length;
  for (let s of steps) {
    let index = anchorIndex + s;
    if (index < 0 || index >= tilesLength) {
      continue;
    }
    const {row, col} = indexToRowCol(index, boardSize);
    if (step === 1) {
      if (row !== startRow) {
        continue;
      }
    } else {
      if (col !== startCol) {
        continue;
      }
    }
    
    while (tiles[index].letter !== null && tiles[index].letter !== undefined) {
      indices.push(index);
      index = index + s;
      if (index >= tilesLength || index < 0) {
        break;
      }
      const {row, col} = indexToRowCol(index, boardSize);
      if (step === 1) {
        if (row !== startRow) {
          break;
        }
      } else {
        if (col !== startCol) {
          break;
        }
      }
    }
  }

  if (indices.length > 0) {
    indices.push(anchorIndex);
  }

  return indices.sort((a, b) => a - b);
}

export default getWordIndicesFromAnchor;