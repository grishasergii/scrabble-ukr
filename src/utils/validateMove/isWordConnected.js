const isWordConnected = (wordIndices, step_horizontal, step_vertical, squares) => {
  let alreadyPlayedPresent = false;
  for (let letter of squares.map(sq => sq.letter).filter(l => l !== null && l !== undefined)) {
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
      if (index_modified >= 0 && index_modified < squares.length) {
        if (squares[index_modified].letter !== null && squares[index_modified].letter !== undefined) {
          if (squares[index_modified].letter.alreadyPlayed === true) {
            return true;
          }
        }
      }      
    }
  }

  return false;
};

export default isWordConnected;

