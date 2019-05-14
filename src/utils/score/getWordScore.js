const getWordScore = (wordIndices, tiles) => {
  const letterValues = wordIndices.map(i => {
    if (tiles[i].letter.alreadyPlayed === true) {
      return tiles[i].letter.value;
    }
    let letterMultiplier = 1;
    if (tiles[i].bonus !== null && tiles[i].bonus !== undefined) {
      letterMultiplier = tiles[i].bonus.letterMultiplier;
    }
    return tiles[i].letter.value * letterMultiplier;
  });

  let wordValue = letterValues.reduce((accumulator, currentValue) => accumulator + currentValue);

  const wordMultipliers = wordIndices.map(i => {
    if (tiles[i].letter.alreadyPlayed === true) {
      return 1;
    }

    if (tiles[i].bonus !== null && tiles[i].bonus !== undefined) {
      return tiles[i].bonus.wordMultiplier;
    }

    return 1;
  });

  for (const m of wordMultipliers) {
    wordValue = wordValue * m;
  }

  const numberOfTilesPlaced = wordIndices.reduce((accumulator, i) => {
    if (tiles[i].letter.alreadyPlayed === false) {
      return accumulator + 1;
    }

    return accumulator;
  });

  if (numberOfTilesPlaced === 7) {
    wordValue = wordValue + 50;
  }

  return wordValue;
}

export default getWordScore;