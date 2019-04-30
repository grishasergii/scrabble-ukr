import PlacedLetterSequenceIsAValidWord from '../../../utils/validateMove/PlacedLetterSequenceIsAValidWord';

describe('PlacedLetterSequenceIsAValidWord.isSatisfied', () => {
  describe('when single letter is placed', () => {
    describe('when direction is horizontal', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new PlacedLetterSequenceIsAValidWord();
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: {letter: 'c'}}, {letter: {letter: 'a'}}, {letter: {letter: 't'}}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        ]
        const boardSize = 5;
        const dictionary = new Set(['cat', 'pet']);
        const placedTilesIndices = [11];
        const direction = 'horizontal';

        const actual = rule.isSatisfied({tiles: tiles, boardSize: boardSize, dictionary: dictionary, placedTilesIndices: placedTilesIndices, direction: direction});
        
        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });
    describe('when placed letter is surrounded by already played tiles', () => {
      it('returns true and errorMEssage is null', () => {
        const rule = new PlacedLetterSequenceIsAValidWord();
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: {letter: 'c'}}, {letter: {letter: 'a'}}, {letter: {letter: 't'}}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        ]
        const boardSize = 5;
        const dictionary = new Set(['cat', 'pet']);
        const placedTilesIndices = [12];
        const direction = 'horizontal';
  
        const actual = rule.isSatisfied({tiles: tiles, boardSize: boardSize, dictionary: dictionary, placedTilesIndices: placedTilesIndices, direction: direction});
        
        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });
    describe('when direction is vertical', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new PlacedLetterSequenceIsAValidWord();
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: {letter: 'c'}}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: {letter: 't'}}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        ]
        const boardSize = 5;
        const dictionary = new Set(['cat', 'pet']);
        const placedTilesIndices = [7];
        const direction = 'vertical';

        const actual = rule.isSatisfied({tiles: tiles, boardSize: boardSize, dictionary: dictionary, placedTilesIndices: placedTilesIndices, direction: direction});
        
        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });
    describe('when placed letter is surrounded by already played tiles', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new PlacedLetterSequenceIsAValidWord();
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: {letter: 'c'}}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: {letter: 't'}}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        ]
        const boardSize = 5;
        const dictionary = new Set(['cat', 'pet']);
        const placedTilesIndices = [12];
        const direction = 'vertical';
  
        const actual = rule.isSatisfied({tiles: tiles, boardSize: boardSize, dictionary: dictionary, placedTilesIndices: placedTilesIndices, direction: direction});
        
        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();      
      });
    });
  });
});