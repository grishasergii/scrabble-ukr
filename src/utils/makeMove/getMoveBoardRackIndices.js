import getAnchorIndices from './getAnchorIndices';
import getWordBuildStepFromAnchor from './getWordBuildStepFromAnchor';
import isValidWordPlacement from '../validateMove/isValidWordPlacement';
import candidatesGenerator from './candidatesGenerator';

const getMoveBoardRackIndices = (tiles, boardSize, rack, dictionary) => {
  const anchorIndices = [...getAnchorIndices(tiles, boardSize)];

  if (anchorIndices.length === 0) {
    return [];
  }

  // const anchorIndex = anchorIndices[Math.floor(Math.random() * anchorIndices.length)];
  const anchorIndex = anchorIndices[0];
  const step = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);

  for (const candidateBoardRackIndices of candidatesGenerator(
    tiles, rack, anchorIndex, boardSize, step)) {

    const updatedTiles = tiles.map(x => { return {...x}; });
    const placedTilesIndices = [];
    for (const boardRackIndex of candidateBoardRackIndices) {
      updatedTiles[boardRackIndex.boardIndex].letter = {...rack[boardRackIndex.rackIndex]};
      placedTilesIndices.push(boardRackIndex.boardIndex);
    }

    const {isValid} = isValidWordPlacement(updatedTiles, boardSize, placedTilesIndices, dictionary);
    if (isValid === true) {
      return candidateBoardRackIndices;
    }
  }

  return null;
};

export default getMoveBoardRackIndices;
