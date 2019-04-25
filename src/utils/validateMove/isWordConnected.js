const isWordConnected = (wordIndices, step_horizontal, step_vertical, tiles) => {
  const tilesLength = tiles.length;
  let alreadyPlayedPresent = false;

  for (let i = 0; i < tilesLength; i++) {
    const letter = tiles[i].letter;

    if (letter === null || letter === undefined) {
      continue;
    }

    if (letter.alreadyPlayed === true) {
      alreadyPlayedPresent = true;
      break;
    }
  }

  if (alreadyPlayedPresent === false) {
    return true;
  }

  const modifiers = [step_horizontal, -step_horizontal, step_vertical, -step_vertical];
  for (let index of wordIndices) {
    for (let modifier of modifiers) {
      const index_modified = index + modifier;
      if (index_modified >= 0 && index_modified < tilesLength) {
        if (tiles[index_modified].letter !== null && tiles[index_modified].letter !== undefined) {
          if (tiles[index_modified].letter.alreadyPlayed === true) {
            return true;
          }
        }
      }      
    }
  }

  return false;
};

export default isWordConnected;

