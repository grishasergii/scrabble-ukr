import getAnchorIndices from './getAnchorIndices';
import getWordsAtAnchor from './getWordsAtAnchor';
import getWordBuildStepFromAnchor from './getWordBuildStepFromAnchor';

const getWords = (tiles, boardSize, rack, dictionary) => {
  const anchorIndices = getAnchorIndices(tiles, boardSize);

  if (anchorIndices.length === 0) {
    return [];
  }

  const anchorIndex = anchorIndices[Math.floor(Math.random() * anchorIndices.length)];

  const step = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);

  const wordsAtAnchor = getWordsAtAnchor(tiles, rack, dictionary, anchorIndex, boardSize, step);
};

export default getWords;
