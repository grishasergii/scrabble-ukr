import ContiniousSequence from '../../../utils/validateMove/ContiniousSequence';

describe('ContiniousSequence.isSatisfied', () => {
  describe('when direction is horizontal', () => {
    const direction = 'horizontal';

    describe('when only one letter is placed', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new ContiniousSequence();
        const tiles = [
          {}, {}, {}, {}, {},
          {}, {}, {letter: {}}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {letter: {}}, {},
        ];
        const boardSize = 5;
        const placedTilesIndices = [7];

        const actual = rule.isSatisfied({tiles: tiles, placedTilesIndices: placedTilesIndices, boardSize: boardSize, direction: direction});
        
        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });

    describe('when sequence is continious', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new ContiniousSequence();
        const tiles = [
          {}, {}, {}, {}, {},
          {}, {}, {letter: {}}, {letter: {}}, {letter: {}},
          {letter: {}}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
        ];
        const boardSize = 5;
        const placedTilesIndices = [7, 9];

        const actual = rule.isSatisfied({tiles: tiles, placedTilesIndices: placedTilesIndices, boardSize: boardSize, direction: direction});
        
        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });

    describe('when there are gaps', () => {
      it('returns false and errorMessage is not null', () => {
        const rule = new ContiniousSequence();
        const tiles = [
          {}, {}, {}, {}, {},
          {}, {}, {letter: {}}, {}, {letter: {}},
          {letter: {}}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
        ];
        const boardSize = 5;
        const placedTilesIndices = [7, 9];

        const actual = rule.isSatisfied({tiles: tiles, placedTilesIndices: placedTilesIndices, boardSize: boardSize, direction: direction});
        
        expect(actual).toEqual(false);
        expect(rule.errorMessage !== null).toEqual(true);
      });
    });
  });

  describe('when direction is vertical', () => {
    const direction = 'vertical';

    describe('when only one letter is placed', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new ContiniousSequence();
        const tiles = [
          {}, {letter: {}}, {}, {}, {},
          {}, {}, {letter: {}}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
        ];
        const boardSize = 5;
        const placedTilesIndices = [7];

        const actual = rule.isSatisfied({tiles: tiles, placedTilesIndices: placedTilesIndices, boardSize: boardSize, direction: direction});
        
        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });

    describe('when sequence is continious', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new ContiniousSequence();
        const tiles = [
          {}, {}, {letter: {}}, {}, {},
          {}, {}, {letter: {}}, {}, {},
          {letter: {}}, {}, {letter: {}}, {}, {},
          {}, {}, {}, {}, {},
        ];
        const boardSize = 5;
        const placedTilesIndices = [2, 12];

        const actual = rule.isSatisfied({tiles: tiles, placedTilesIndices: placedTilesIndices, boardSize: boardSize, direction: direction});
        
        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });

    describe('when there are gaps', () => {
      it('returns false and errorMessage is not null', () => {
        const rule = new ContiniousSequence();
        const tiles = [
          {}, {}, {letter: {}}, {}, {},
          {}, {}, {}, {}, {},
          {letter: {}}, {}, {letter: {}}, {}, {},
          {}, {}, {}, {}, {},
        ];
        const boardSize = 5;
        const placedTilesIndices = [2, 12];

        const actual = rule.isSatisfied({tiles: tiles, placedTilesIndices: placedTilesIndices, boardSize: boardSize, direction: direction});
        
        expect(actual).toEqual(false);
        expect(rule.errorMessage !== null).toEqual(true);
      });
    });
  });

});