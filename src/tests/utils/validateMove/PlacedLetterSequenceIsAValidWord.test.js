import PlacedLetterSequenceIsAValidWord from '../../../utils/validateMove/PlacedLetterSequenceIsAValidWord';

describe('PlacedLetterSequenceIsAValidWord.isSatisfied', () => {
  describe('when single letter is placed', () => {
    describe('when formed word is in the dictionary', () => {
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
      describe('when multiple words are formed', () => {
        it('returns true and error message is null', () => {
          const rule = new PlacedLetterSequenceIsAValidWord();
          const tiles = [
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: {letter: 'c'}}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: {letter: 'n'}}, {letter: {letter: 't'}}, 
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
    describe ('when formed word is not in the dictionary', () => {
      describe('when direction is vertical', () => {
        describe('when multiple words are formed', () => {
          it('returns false and error message is not null', () => {
            const rule = new PlacedLetterSequenceIsAValidWord();
            const tiles = [
              {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
              {letter: null}, {letter: null}, {letter: {letter: 'c'}}, {letter: null}, {letter: null}, 
              {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: {letter: 'n'}}, {letter: {letter: 't'}}, 
              {letter: null}, {letter: null}, {letter: {letter: 't'}}, {letter: null}, {letter: null}, 
              {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            ]
            const boardSize = 5;
            const dictionary = new Set(['ant', 'pet']);
            const placedTilesIndices = [12];
            const direction = 'vertical';
      
            const actual = rule.isSatisfied({tiles: tiles, boardSize: boardSize, dictionary: dictionary, placedTilesIndices: placedTilesIndices, direction: direction});
            
            expect(actual).toEqual(false);
            expect(rule.errorMessage !== null).toEqual(true);   
          });
        });
      });
    });
  });

  describe('when multiple letters are placed', () => {
    describe('when direction is horizontal', () => {
      describe('when two valid words are concatenated into an invalid word', () => {
        it('returns false and error message is not null', () => {
          const rule = new PlacedLetterSequenceIsAValidWord();
          const tiles = [
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: {letter: 'c'}}, {letter: {letter: 'a'}}, {letter: {letter: 't'}}, {letter: {letter: 'a'}}, {letter: {letter: 'n'}}, {letter: {letter: 't'}}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          ]
          const boardSize = 7;
          const dictionary = new Set(['cat', 'ant']);
          const placedTilesIndices = [21, 22, 23];
          const direction = 'horizontal';
    
          const actual = rule.isSatisfied({tiles: tiles, boardSize: boardSize, dictionary: dictionary, placedTilesIndices: placedTilesIndices, direction: direction});
          
          expect(actual).toEqual(false);
          expect(rule.errorMessage !== null).toEqual(true);   
        });
      });
    });
    describe('when direction is vertical', () => {
      describe('when two valid words are concatenated into an invalid word', () => {
        it('returns false and error message is not null', () => {
          const rule = new PlacedLetterSequenceIsAValidWord();
          const tiles = [
            {letter: null}, {letter: {letter: 'c'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: {letter: 't'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: {letter: 'a'}}, {letter: {letter: 't'}}, {letter: {letter: 'a'}}, {letter: {letter: 'n'}}, {letter: {letter: 't'}}, {letter: null}, 
            {letter: null}, {letter: {letter: 'n'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: {letter: 't'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          ]
          const boardSize = 7;
          const dictionary = new Set(['cat', 'ant']);
          const placedTilesIndices = [1, 8, 15];
          const direction = 'vertical';
    
          const actual = rule.isSatisfied({tiles: tiles, boardSize: boardSize, dictionary: dictionary, placedTilesIndices: placedTilesIndices, direction: direction});
          
          expect(actual).toEqual(false);
          expect(rule.errorMessage !== null).toEqual(true);   
        });
      });
    });
  });

  describe('when multiple letters are placed', () => {
    describe('when direction is horizontal', () => {
      describe('when two valid words are concatenated into an invalid word', () => {
        it('returns false and error message is not null', () => {
          const rule = new PlacedLetterSequenceIsAValidWord();
          const tiles = [
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: {letter: 'c'}}, {letter: {letter: 'a'}}, {letter: {letter: 't'}}, {letter: {letter: 'a'}}, {letter: {letter: 'n'}}, {letter: {letter: 't'}}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          ]
          const boardSize = 7;
          const dictionary = new Set(['cat', 'ant']);
          const placedTilesIndices = [21, 22, 23];
          const direction = 'horizontal';
    
          const actual = rule.isSatisfied({tiles: tiles, boardSize: boardSize, dictionary: dictionary, placedTilesIndices: placedTilesIndices, direction: direction});
          
          expect(actual).toEqual(false);
          expect(rule.errorMessage !== null).toEqual(true);   
        });
      });
      describe('when new word touches the edge', () => {
        it('correctly identifies the word and returns true', () => {
          const rule = new PlacedLetterSequenceIsAValidWord();
          const tiles = [
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'd'}},
            {letter: {letter: 'a'}}, {letter: {letter: 'b'}}, {letter: {letter: 'c'}}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          ];
          const boardSize = 5;
          const direction = 'horizontal';
          const placedTilesIndices = [15, 17];
          const dictionary = new Set(['abc']);

          const actual = rule.isSatisfied({
            tiles: tiles, 
            boardSize: boardSize, 
            dictionary: dictionary, 
            placedTilesIndices: placedTilesIndices, 
            direction: direction
          });

          expect(actual).toEqual(true);
          expect(rule.errorMessage).toBeNull();
        });
      });
    });
    describe('when direction is vertical', () => {
      describe('when two valid words are concatenated into an invalid word', () => {
        it('returns false and error message is not null', () => {
          const rule = new PlacedLetterSequenceIsAValidWord();
          const tiles = [
            {letter: null}, {letter: {letter: 'c'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: {letter: 't'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: {letter: 'a'}}, {letter: {letter: 't'}}, {letter: {letter: 'a'}}, {letter: {letter: 'n'}}, {letter: {letter: 't'}}, {letter: null}, 
            {letter: null}, {letter: {letter: 'n'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: {letter: 't'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          ]
          const boardSize = 7;
          const dictionary = new Set(['cat', 'ant']);
          const placedTilesIndices = [1, 8, 15];
          const direction = 'vertical';
    
          const actual = rule.isSatisfied({tiles: tiles, boardSize: boardSize, dictionary: dictionary, placedTilesIndices: placedTilesIndices, direction: direction});
          
          expect(actual).toEqual(false);
          expect(rule.errorMessage !== null).toEqual(true);   
        });
      });
    });
  });
});