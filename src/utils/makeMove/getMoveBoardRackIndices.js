import getAnchorIndices from './getAnchorIndices';
import getWordBuildStepFromAnchor from './getWordBuildStepFromAnchor';
import isValidWordPlacement from '../validateMove/isValidWordPlacement';
import candidatesGenerator from './candidatesGenerator';

const getMoveBoardRackIndices = (tiles, boardSize, rack, dictionary) => {
  const anchorIndices = getAnchorIndices(tiles, boardSize);

  if (anchorIndices.length === 0) {
    return [];
  }

  const anchorIndex = anchorIndices[0];
  const step = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);
  const updatedTiles = tiles.map(x => { return {...x}; });
  let counter = 0;
  for (const candidateBoardRackIndices of candidatesGenerator(
    tiles, rack, anchorIndex, boardSize, step)) {
    counter += 1;

    const placedTilesIndices = [];
    for (const boardRackIndex of candidateBoardRackIndices) {
      updatedTiles[boardRackIndex.boardIndex].letter = {...rack[boardRackIndex.rackIndex]};
      placedTilesIndices.push(boardRackIndex.boardIndex);
    }

    const {isValid} = isValidWordPlacement(updatedTiles, boardSize, placedTilesIndices, dictionary);
    for (const boardRackIndex of candidateBoardRackIndices) {
      updatedTiles[boardRackIndex.boardIndex].letter = null;
    }
    
    if (isValid === true) {
      console.log(counter);
      return candidateBoardRackIndices;
    }
  }
  console.log(counter);
  return null;
};

export default getMoveBoardRackIndices;
