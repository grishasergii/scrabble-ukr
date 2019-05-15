import getWordIndicesFromAnchor from '../validateMove/getWordIndicesFromAnchor';
import getWordScore from './getWordScore';


const getWordsWithScore = (tiles, placedTilesIndices, boardSize, direction) => {
  const scores = [];

  let stepPrimary = 1;
  let stepSecondary = boardSize;
  if (direction === 'vertical') {
    stepPrimary = boardSize;
    stepSecondary = 1;
  }

  const primaryWordIndices = getWordIndicesFromAnchor(tiles, placedTilesIndices[0], stepPrimary, boardSize);

  scores.push({
    word: primaryWordIndices.map(i => tiles[i].letter.letter.toLowerCase()).join(''),
    score: getWordScore(primaryWordIndices, tiles)
  })

  for (const i of placedTilesIndices) {
    const secondaryWordIndices = getWordIndicesFromAnchor(tiles, i, stepSecondary, boardSize);
    if (secondaryWordIndices.length === 0) {
      continue;
    }

    scores.push({
      word: secondaryWordIndices.map(i => tiles[i].letter.letter.toLowerCase()).join(''),
      score: getWordScore(secondaryWordIndices, tiles)
    });
  }

  return scores;
}

export default getWordsWithScore;