import getAnchorIndices from './getAnchorIndices';
import getWordBuildStepFromAnchor from './getWordBuildStepFromAnchor';
import candidatesGenerator from './candidatesGenerator';
import ComputerMoveValidation from '../validateMove/ComputerMoveValidation';

const getMoveBoardRackIndices = (tiles, boardSize, rack, dictionary) => {
  const anchorIndices = getAnchorIndices(tiles, boardSize).sort(() => Math.random() - 0.5);
  if (anchorIndices.length === 0) {
    return [];
  }

  const updatedTiles = tiles.map(x => { return {...x}; });
  const validator = new ComputerMoveValidation();

  for (const anchorIndex of anchorIndices) {
    const step = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);
    const direction = step === 1 ? 'horizontal' : 'vertical';
    for (const candidateBoardRackIndices of candidatesGenerator(
      tiles, rack, anchorIndex, boardSize, step)) {
  
      const placedTilesIndices = [];
      for (const boardRackIndex of candidateBoardRackIndices) {
        updatedTiles[boardRackIndex.boardIndex].letter = {...rack[boardRackIndex.rackIndex]};
        placedTilesIndices.push(boardRackIndex.boardIndex);
      }

      const {isValid} = validator.validate({
        tiles: updatedTiles, 
        boardSize: boardSize, 
        placedTilesIndices: placedTilesIndices, 
        dictionary: dictionary,
        direction: direction
      });
      
      for (const boardRackIndex of candidateBoardRackIndices) {
        updatedTiles[boardRackIndex.boardIndex].letter = null;
      }
      
      if (isValid === true) {
        return candidateBoardRackIndices;
      }
    }
  }

  return null;
};

export default getMoveBoardRackIndices;
