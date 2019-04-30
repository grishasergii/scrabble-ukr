import ValidationRule from '../validation/ValidationRule';
import indexToRowCol from '../board/indexToRowCol';

class AllLettersInTheSameRowOrColumn extends ValidationRule {
  isSatisfied({placedTilesIndices = [], boardSize = 0} = {}) {
    const rows = new Set([]);
    const cols = new Set([]);
    const placedTilesIndicesLength = placedTilesIndices.length;
    for (let i = 0; i < placedTilesIndicesLength; i++) {
      const {row, col} = indexToRowCol(placedTilesIndices[i], boardSize)
      rows.add(row);
      cols.add(col);   
    }
  
    if (rows.size > 1 && cols.size > 1) {
      this.errorMessage = 'All letters must be placed in the same row or column';
      return false;
    }
    
    return true;
  }
}

export default AllLettersInTheSameRowOrColumn;