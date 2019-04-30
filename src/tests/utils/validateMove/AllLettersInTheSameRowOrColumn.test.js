import AllLettersInTheSameRowOrColumn from '../../../utils/validateMove/AllLettersInTheSameRowOrColumn';

describe('AllLettersInTheSameRowOrColumn isSatisfied', () => {
  const rule = new AllLettersInTheSameRowOrColumn();

  describe('when one letter placed', () => {
    it('returns true and errorMessage is null', () => {
      const placedTilesIndices = [4];
      const boardSize = 5;

      const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, boardSize: boardSize});

      expect(actual).toEqual(true);
      expect(rule.errorMessage).toBeNull();
    });
  });

  describe('when multiple letters are placed', () => {
    describe('when in the same row', () => {
      describe('with no gaps', () => {
        it('returns true and errorMessage is null', () => {
          const placedTilesIndices = [5, 6, 7, 8];
          const boardSize = 5;
    
          const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, boardSize: boardSize});
    
          expect(actual).toEqual(true);
          expect(rule.errorMessage).toBeNull();
        });
      });
      describe('with gaps', () => {
        it('returns true and errorMessage is null', () => {
          const placedTilesIndices = [5, 8, 9];
          const boardSize = 5;
    
          const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, boardSize: boardSize});
    
          expect(actual).toEqual(true);
          expect(rule.errorMessage).toBeNull();
        });
      });
    });
    describe('when in the same column', () => {
      describe('with no gaps', () => {
        it('returns true and errorMessage is null', () => {
          const placedTilesIndices = [1, 6, 11];
          const boardSize = 5;
    
          const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, boardSize: boardSize});
    
          expect(actual).toEqual(true);
          expect(rule.errorMessage).toBeNull();
        });
      });
      describe('with gaps', () => {
        it('returns true and errorMessage is null', () => {
          const placedTilesIndices = [1, 16, 11];
          const boardSize = 5;
    
          const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, boardSize: boardSize});
    
          expect(actual).toEqual(true);
          expect(rule.errorMessage).toBeNull();
        });
      });
    });

    describe('when in different rows and columns', () => {
      it('returns false and error message is not null', () => {
        const placedTilesIndices = [1, 11, 16, 3];
        const boardSize = 5;
  
        const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, boardSize: boardSize});
  
        expect(actual).toEqual(false);
        expect(rule.errorMessage !== null).toEqual(true);
      });

      it('returns false and error message is not null', () => {
        const placedTilesIndices = [5, 6, 7, 8, 9, 10];
        const boardSize = 5;
  
        const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, boardSize: boardSize});
  
        expect(actual).toEqual(false);
        expect(rule.errorMessage !== null).toEqual(true);
      });
    });
  });
});