import ValidationRule from '../validation/ValidationRule';
import indexToRowCol from '../board/indexToRowCol';

class WordConnected extends ValidationRule {
  isSatisfied({placedTilesIndices, tiles, boardSize}) {
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
  
    const modifiers = [1, -1, boardSize, -boardSize];
    for (let index of placedTilesIndices) {
      const indexRowCol = indexToRowCol(index, boardSize);
      for (let modifier of modifiers) {
        const index_modified = index + modifier;
        if (index_modified >= 0 && index_modified < tilesLength) {
          const indexModifiedRowCol = indexToRowCol(index_modified, boardSize);
          if (indexRowCol.row !== indexModifiedRowCol.row && indexRowCol.col !== indexModifiedRowCol.col) {
            continue;
          }

          if (tiles[index_modified].letter !== null && tiles[index_modified].letter !== undefined) {
            if (tiles[index_modified].letter.alreadyPlayed === true) {
              return true;
            }
          }
        }      
      }
    }
    
    this.errorMessage = 'Placed tiles must be connected to already present';
    return false;
  }
}

export default WordConnected;