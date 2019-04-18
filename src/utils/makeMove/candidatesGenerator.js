import indexToRowCol from '../board/indexToRowCol';
import rowColToIndex from '../board/rowColToIndex';
import Combinatorics from 'js-combinatorics';

function* candidatesGenerator(tiles, rack, anchorIndex, boardSize, step) {
  const anchorRowCol = indexToRowCol(anchorIndex, boardSize);
  let leftMost;
  let rightMost;
  if (step === 1) {
    leftMost = rowColToIndex(anchorRowCol.row, 0, boardSize);
    rightMost = rowColToIndex(anchorRowCol.row, boardSize-1, boardSize);
  } else {
    leftMost = rowColToIndex(0, anchorRowCol.col, boardSize);
    rightMost = rowColToIndex(boardSize-1, anchorRowCol.col, boardSize);   
  }

  const lettersWithRackIndices = [];
  for (let i = 0; i < rack.length; i++) {
    if (rack[i] === null || rack[i] === undefined) {
      continue;
    }
    lettersWithRackIndices.push({
      letter:  rack[i].letter,
      indexInRack: i
    });
  }

  const emptyTilesIndicesLeft = [];
  for (let i = leftMost; i < anchorIndex; i += step) {
    if (tiles[i].letter !== null && tiles[i].letter !== undefined) {
      continue;
    }
    emptyTilesIndicesLeft.push(i);
  }

  const emptyTilesIndicesRight = [];
  for (let i = anchorIndex+step; i <= rightMost; i += step) {
    if (tiles[i].letter !== null && tiles[i].letter !== undefined) {
      continue;
    }
    emptyTilesIndicesRight.push(i);
  }

  const emptyTilesCount = emptyTilesIndicesLeft.length + emptyTilesIndicesRight.length + 1;

  const maxCombinationLength = Math.min(lettersWithRackIndices.length, emptyTilesCount);
  const seenCombinations = new Set();
  for (let combinationLength=maxCombinationLength; combinationLength > 1; combinationLength--) {
    const combinations = Combinatorics.combination(lettersWithRackIndices, combinationLength);
    let combination;
    while (combination = combinations.next()) {  
      const lettersCombination = combination.map(x => x.letter);
      if (seenCombinations.has(lettersCombination)) {
        continue;
      }
      seenCombinations.add(lettersCombination);

      const start = Math.max(0, emptyTilesIndicesLeft.length - combinationLength + 1);
      for (let i =  start; i < emptyTilesIndicesLeft.length; i++) {
        const leftPart = emptyTilesIndicesLeft.slice(i, i + combinationLength);
        const rightPart = emptyTilesIndicesRight.slice(0, combinationLength - leftPart.length);
        const tileIndices = leftPart.concat([anchorIndex]).concat(rightPart);
        const boardRackIndices = [];
        for (let j = 0; j < combination.length; j++) {
          boardRackIndices.push({
            boardIndex: tileIndices[j],
            rackIndex: combination[j].indexInRack
          });
        }

        yield boardRackIndices;
      }
    }
  }

  for (let i = 0; i < lettersWithRackIndices.length; i++) {
    if (seenCombinations.has(lettersWithRackIndices[i].letter)) {
      continue;
    }
    seenCombinations.add(lettersWithRackIndices[i].letter);

    yield [{
      boardIndex: anchorIndex,
      rackIndex: lettersWithRackIndices[i].indexInRack
    }];
  }
}

export default candidatesGenerator;