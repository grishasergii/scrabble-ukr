import indexToRowCol from '../board/indexToRowCol';

const getDirection = (tiles, placedTilesIndices, boardSize) => {
  if (placedTilesIndices.length === 0) {
    return '';
  }
  
  const rows = new Set([]);
  const cols = new Set([]);

  for (let i of placedTilesIndices) {
    const {row, col} = indexToRowCol(i, boardSize);
    rows.add(row);
    cols.add(col);
  }

  if (rows.size === 1 && cols.size > 1) {
    return 'horizontal';
  }

  if (cols.size === 1 && rows.size > 1) {
    return 'vertical';
  }

  const tilesLength = tiles.length;
  const steps = [1, -1, boardSize, -boardSize];
  const indices = steps.map(s => s + placedTilesIndices[0]);
  for (let i=0; i<4; i++) {
    const index = indices[i];
    if (index < 0 || index >= tilesLength) {
      continue;
    }
    if (tiles[index].letter !== null && tiles[index].letter !== undefined) {
      if (tiles[index].letter.alreadyPlayed === true) {
        const step = Math.abs(steps[i]);
        if (step === 1) {
          return 'horizontal';
        } else {
          return 'vertical';
        }
      } 
    }
  }

  return 'horizontal';
}

export default getDirection;