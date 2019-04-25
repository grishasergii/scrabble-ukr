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
  const rackLength = rack.length;
  for (let i = 0; i < rackLength; i++) {
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
  const emptyTilesIndices = emptyTilesIndicesLeft.concat([anchorIndex]).concat(emptyTilesIndicesRight);

  const maxCombinationLength = Math.min(lettersWithRackIndices.length, emptyTilesIndices.length);
  const seenCombinations = new Set();
  for (let combinationLength=maxCombinationLength; combinationLength > 1; combinationLength--) {
    const combinations = Combinatorics.combination(lettersWithRackIndices, combinationLength);
    let combination;
    while (combination = combinations.next()) {  
      const permutations = Combinatorics.permutation(combination);
      let permuation;
      while (permuation = permutations.next()) {
        const lettersCombination = permuation.map(x => x.letter);
        if (seenCombinations.has(lettersCombination)) {
          continue;
        }
        seenCombinations.add(lettersCombination);
  
        const start = Math.max(0, emptyTilesIndicesLeft.length - combinationLength + 1);
        const stop = emptyTilesIndices.length - combinationLength;
        for (let i = start; i <= stop; i++) {
          const tileIndices = emptyTilesIndices.slice(i, i + combinationLength);
          const boardRackIndices = [];
          for (let j = 0; j < combinationLength; j++) {
            boardRackIndices.push({
              boardIndex: tileIndices[j],
              rackIndex: permuation[j].indexInRack
            });
          }
  
          yield boardRackIndices;
        }
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