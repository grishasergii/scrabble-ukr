import getAnchorIndices from './getAnchorIndices';
import getWordsAtAnchor from './getWordsAtAnchor';
import getWordBuildStepFromAnchor from './getWordBuildStepFromAnchor';
import isValidWordPlacement from '../validateMove/isValidWordPlacement';

const getMoveBoardRackIndices = (tiles, boardSize, rack, dictionary) => {
  const anchorIndices = getAnchorIndices(tiles, boardSize);

  if (anchorIndices.length === 0) {
    return [];
  }

  const anchorIndex = anchorIndices[Math.floor(Math.random() * anchorIndices.length)];

  const step = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);

  const wordsAtAnchor = getWordsAtAnchor(tiles, rack, dictionary, anchorIndex, boardSize, step);
  for (let word of wordsAtAnchor) {
    const updatedTiles = tiles.map(x => { return {...x}; });
    const placedTilesIndices = [];
    const boardRackIndices = [];
    const tempRack = rack.map(x => { return {...x} });
    for (let letter of word) {
      if (updatedTiles[letter.index].letter !== null && updatedTiles[letter.index] !== undefined) {
        continue;
      }

      const rackIndex = tempRack.findIndex(x => x.letter !== null &&  x.letter.toLowerCase() === letter.letter);
      tempRack[rackIndex].letter = null;

      boardRackIndices.push({
        boardIndex: letter.index,
        rackIndex: rackIndex
      });

      updatedTiles[letter.index].letter = { letter: letter.letter };
      placedTilesIndices.push(letter.index);
    }
    const {isValid, _} = isValidWordPlacement(updatedTiles, boardSize, placedTilesIndices, dictionary);
    if (isValid === true) {
      return boardRackIndices;
    }
  }

  return null;
};

export default getMoveBoardRackIndices;
