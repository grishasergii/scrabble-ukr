import AdjacentWordsAreValid from '../../../utils/validateMove/AdjacentWordsAreValid';

describe('AdjacentWordsAreValid.isSatisfied', () => {
  describe('when direction is horizontal', () => {
    describe('when all words are in the dictionary', () => {
      it('returns true and null error message', () => {
        const rule = new AdjacentWordsAreValid();
        const tiles = [
          {letter: {letter: 'c'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: {letter: 'a'}}, {letter: {letter: 'n'}}, {letter: {letter: 't'}}, {letter: null}, {letter: null}, 
          {letter: {letter: 't'}}, {letter: null}, {letter: null}, {letter: {letter: 'o'}}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'y'}}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        ];
        const boardSize = 5;
        const direction = 'horizontal';
        const dictionary = new Set(['cat', 'toy']);
        const placedTilesIndices = [5, 6, 7];

        const actual = rule.isSatisfied({tiles: tiles, boardSize: boardSize, direction: direction, placedTilesIndices: placedTilesIndices, dictionary: dictionary});

        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });

    describe('when not all words are in the dictionary', () => {
      it('returns false and not null error message', () => {
        const rule = new AdjacentWordsAreValid();
        const tiles = [
          {letter: {letter: 'c'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: {letter: 'a'}}, {letter: {letter: 'n'}}, {letter: {letter: 't'}}, {letter: null}, {letter: null}, 
          {letter: {letter: 't'}}, {letter: null}, {letter: null}, {letter: {letter: 'o'}}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'y'}}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        ];
        const boardSize = 5;
        const direction = 'horizontal';
        const dictionary = new Set(['toy']);
        const placedTilesIndices = [5, 6, 7];

        const actual = rule.isSatisfied({tiles: tiles, boardSize: boardSize, direction: direction, placedTilesIndices: placedTilesIndices, dictionary: dictionary});

        expect(actual).toEqual(false);
        expect(rule.errorMessage !== null).toEqual(true);
      });
    });
  });
});