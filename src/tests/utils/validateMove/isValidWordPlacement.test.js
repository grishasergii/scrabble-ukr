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
            {letter: null}, {letter: {letter: 'z'}}, {letter: null}, {letter: null}, {letter: null},
            {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'b'}}, {letter: null}, 
          ];
          const dictionary = {
            'aaab': [],
            'az': []
          };
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
          const dictionary = {
            'az': []
          };
          const boardSize = 5;
          const placedTilesIndices = [5];
    
          const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
    
          expect(isValid).toEqual(true);
          expect(errorMessage).toBeNull();
        });
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
          const dictionary = {
            'aaad': [],
            'as': []
          };
          const boardSize = 5;
          const placedTilesIndices = [9, 14, 24];
    
          const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
    
          expect(isValid).toEqual(true);
          expect(errorMessage).toBeNull();
        });
      });
    });
  });

  describe('when no letters were placed', () => {
    it('returns false and an error message', () => {
      const tiles = [];
      const dictionary = {};
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
      const dictionary = {};
      const boardSize = 15;
      const placedTilesIndices = [46, 47, 48, 63];

      const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);

      expect(isValid).toEqual(false);
      expect(errorMessage).toBeDefined();
    });

    it('returns false and an error message', () => {
      const tiles = [];
      const dictionary = {};
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
      const dictionary = {};
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
      const dictionary = {};
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
          {letter: null}, {letter: {}}, {letter: {}}, {letter: {}}, {letter: {}},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        ];
        const dictionary = {};
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
          {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: {}},
          {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: null}, 
        ];
        const dictionary = {};
        const boardSize = 5;
        const placedTilesIndices = [7, 12, 17, 22];
  
        const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
  
        expect(isValid).toEqual(false);
        expect(errorMessage).toBeDefined();
      });
    });
  });

  describe('when not in dictionary', () => {
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
          const dictionary = {
            'aaab': []
          };
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
          const dictionary = {
            'aaab': []
          };
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
          const dictionary = {
            'aaaa': [],
            'bc': []
          };
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
          const dictionary = {
            'aaaa': [],
            'aab': []
          };
          const boardSize = 5;
          const placedTilesIndices = [7, 12, 17, 22];
    
          const {isValid, errorMessage} = isValidWordPlacement(tiles, boardSize, placedTilesIndices, dictionary);
    
          expect(isValid).toEqual(false);
          expect(errorMessage).toBeDefined();
        });
      });
    });
  });
});