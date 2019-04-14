import getAnchorIndices from './getAnchorIndices';
import getWordsAtAnchor from './getWordsAtAnchor';

const getWords = (tiles, boardSize, rack, dictionary) => {
  const anchorIndices = getAnchorIndices(tiles, boardSize);

  if (anchorIndices.length === 0) {
    return [];
  }

  const anchorIndex = anchorIndices[Math.floor(Math.random() * anchorIndices.length)];

  

  const wordsAtAnchor = getWordsAtAnchor(tiles, rack, dictionary, anchorIndex, boardSize, step);
};

export default getWords;
