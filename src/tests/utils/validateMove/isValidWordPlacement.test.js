import isValidWordPlacement from '../../../utils/validateMove/isValidWordPlacement';

describe('isValidWordPlacement', () => {
  describe('when is valid', () => {
    describe('when direction is horizontal', () => {
      describe('when placed letters cross the existing one', () => {
        it('returns true and null error message', () => {
          const tiles = [
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'b'}}, {letter: {letter: 'a'}}, {letter: null},
            {letter: null}, {letter: {letter: 'z', alreadyPlayed: true}}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'b'}}, {letter: null}, 
          ];
          const dictionary = new Set(['aaba', 'az']); 
          const boardSize = 5;
          const placedTilesIndices = [10, 11, 13];
    
          const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
    
          expect(isValid).toEqual(true);
          expect(errorMessage).toBeNull();
        });
      });
      describe('when placed letters do not cross the existing one', () => {
        it('returns true and null error message', () => {
          const tiles = [
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: {letter: 'z'}}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: {letter: 'b'}}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          ];
          const dictionary = new Set(['ab', 'za']); 
          const boardSize = 5;
          const placedTilesIndices = [5, 6];
    
          const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
    
          expect(isValid).toEqual(true);
          expect(errorMessage).toBeNull();
        });
      });
    });
    describe('when single letter is placed', () => {
      it('returns true and null error message', () => {
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, {letter: null},
          {letter: {letter: 'a'}}, {letter: {letter: 'b', alreadyPlayed: true}}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        ];
        const dictionary = new Set(['ab', 'za']); 
        const boardSize = 5;
        const placedTilesIndices = [10];
  
        const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
  
        expect(isValid).toEqual(true);
        expect(errorMessage).toBeNull();       
      });
    });

    describe('when direction is vertical', () => {
      describe('when placed letters cross the existing one', () => {
        it('returns true and null error message', () => {
          const tiles = [
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'a'}},
            {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 's'}}, {letter: {letter: 'a'}},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'd'}},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'a'}}, 
          ];
          const dictionary = new Set(['aada', 'sa']); 
          const boardSize = 5;
          const placedTilesIndices = [9, 14, 24];
    
          const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
    
          expect(isValid).toEqual(true);
          expect(errorMessage).toBeNull();
        });
      });

      describe('when single letter is placed', () => {
        it('returns true and null error message', () => {
          const tiles = [
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, {letter: null},
            {letter: {letter: 'a'}}, {letter: {letter: 'b', alreadyPlayed: true}}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          ];
          const dictionary = new Set(['ab', 'za']); 
          const boardSize = 5;
          const placedTilesIndices = [6];
    
          const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
    
          expect(isValid).toEqual(true);
          expect(errorMessage).toBeNull();       
        });
      });
    });
  });

  describe('when is invalid', () => {
    describe('when no letters were placed', () => {
      it('returns false and an error message', () => {
        const tiles = [];
        const dictionary = new Set([]);
        const boardSize = 0;
        const placedTilesIndices = [];
  
        const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
  
        expect(isValid).toEqual(false);
        expect(errorMessage).toBeDefined();
      });
    });
  
    describe('when placed in different rows and columns', () => {
      it('returns false and an error message', () => {
        const tiles = [];
        const dictionary = new Set([]);
        const boardSize = 15;
        const placedTilesIndices = [46, 47, 48, 63];
  
        const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
  
        expect(isValid).toEqual(false);
        expect(errorMessage).toBeDefined();
      });
  
      it('returns false and an error message', () => {
        const tiles = [];
        const dictionary = new Set([]);
        const boardSize = 15;
        const placedTilesIndices = [20, 35, 50, 64];
  
        const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
  
        expect(isValid).toEqual(false);
        expect(errorMessage).toBeDefined();
      });
    });
  
    describe('when not continious letter sequence', () => {
      it('returns false and an error message', () => {
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: {}}, {letter: {}}, {letter: null}, {letter: {}}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        ];
        const dictionary = new Set([]);
        const boardSize = 5;
        const placedTilesIndices = [10, 11, 13];
  
        const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
  
        expect(isValid).toEqual(false);
        expect(errorMessage).toBeDefined();
      });
  
      it('returns false and an error message', () => {
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {}},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {}},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {}}, 
        ];
        const dictionary = new Set([]);
        const boardSize = 5;
        const placedTilesIndices = [9, 14, 24];
  
        const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
  
        expect(isValid).toEqual(false);
        expect(errorMessage).toBeDefined();
      });
    });
    
    describe('when word is not connected', () => {
      describe('when direction is horizontal', () => {
        it('returns false and an error message', () => {
          const tiles = [
            {letter: null}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: {letter: 'a', alreadyPlayed: true}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          ];
          const dictionary = new Set(['aaaa']);
          const boardSize = 5;
          const placedTilesIndices = [1, 2, 3, 4];
    
          const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
    
          expect(isValid).toEqual(false);
          expect(errorMessage).toBeDefined();
        });
      });
  
      describe('when direction is vertical', () => {
        it('returns false and an error message', () => {
          const tiles = [
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: {}},
            {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null},
            {letter: {letter: 'a', alreadyPlayed: true}}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, 
          ];
          const dictionary = new Set(['aaaa']);
          const boardSize = 5;
          const placedTilesIndices = [7, 12, 17, 22];
    
          const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
    
          expect(isValid).toEqual(false);
          expect(errorMessage).toBeDefined();
        });
      });
    });
  
    describe('when not in dictionary', () => {
      describe('when single letter placed', () => {
        it('returns false and an error message', () => {
          const tiles = [
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          ];
          const dictionary = new Set([]);
          const boardSize = 5;
          const placedTilesIndices = [11];
  
          const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
      
          expect(isValid).toEqual(false);
          expect(errorMessage).toBeDefined();        
        });
      });
  
      describe('when no connected words', () => {
        describe('when direction is horizontal', () => {
          it('returns false and an error message', () => {
            const tiles = [
              {letter: null}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
              {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
              {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
              {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
              {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            ];
            const dictionary = new Set(['aaa']);
            const boardSize = 5;
            const placedTilesIndices = [1, 2, 3, 4];
      
            const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
      
            expect(isValid).toEqual(false);
            expect(errorMessage).toBeDefined();
          });
        });
        describe('when direction is horizontal', () => {
          it('returns false and an error message', () => {
            const tiles = [
              {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
              {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null},
              {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: {}},
              {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null},
              {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, 
            ];
            const dictionary = new Set(['aaab']);
            const boardSize = 5;
            const placedTilesIndices = [7, 12, 17, 22];
      
            const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
      
            expect(isValid).toEqual(false);
            expect(errorMessage).toBeDefined();
          });
        });
      });
  
      describe('when there are connected words', () => {
        describe('when direction is horizontal', () => {
          it('returns false and an error message', () => {
            const tiles = [
              {letter: null}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
              {letter: null}, {letter: {letter: 'b'}}, {letter: null}, {letter: null}, {letter: null},
              {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
              {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
              {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
            ];
            const dictionary = new Set(['aaab']);
            const boardSize = 5;
            const placedTilesIndices = [1, 2, 3, 4];
      
            const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
      
            expect(isValid).toEqual(false);
            expect(errorMessage).toBeDefined();
          });
        });
        describe('when direction is horizontal', () => {
          it('returns false and an error message', () => {
            const tiles = [
              {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
              {letter: null}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'c'}}, {letter: null},
              {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: {}},
              {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null},
              {letter: null}, {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, 
            ];
            const dictionary = new Set(['aaa', 'aac']);
            const boardSize = 5;
            const placedTilesIndices = [7, 12, 17, 22];
      
            const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
      
            expect(isValid).toEqual(false);
            expect(errorMessage).toBeDefined();
          });

          describe('when valid word is appended to already placed word and the combination is not in the dictionary', () => {
            it('returns false and error message', () => {
              const tiles = [
                {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
                {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
                {letter: {letter: 'a'}, alreadyPlayed: true}, {letter: {letter: 'n'}, alreadyPlayed: true}, {letter: {letter: 'd'}, alreadyPlayed: true}, {letter: {letter: 'd' }}, {letter: {letter: 'a'}}, {letter: {letter: 't'}}, {letter: {letter: 'e'}},
                {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
                {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
                {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
                {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
              ];
              const dictionary = new Set(['and', 'date']);
              const boardSize = 7;
              const placedTilesIndices = [17, 18, 19, 20];
        
              const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
        
              expect(isValid).toEqual(false);
              expect(errorMessage).toBeDefined();  
            });
          });
        });
      });
    });
  });
});