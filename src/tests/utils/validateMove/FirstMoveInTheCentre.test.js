import FirstMoveAtIndex from '../../../utils/validateMove/FirstMoveAtIndex';

describe('FirstMoveInTheCentre.isSatisfied', () => {
  describe('when it is a first move', () => {
    describe('when in the centre', () => {
      it('returns true and error message is null', () => {
        const rule = new FirstMoveAtIndex(112);
        const boardSize = 15;
        const tiles = Array(boardSize * boardSize).fill({});
        const placedTilesIndices = [11, 112, 113, 114];

        const actual = rule.isSatisfied({tiles: tiles, placedTilesIndices: placedTilesIndices});

        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });
    describe('when not in the centre', () => {
      it('returns false and error message is not null', () => {
        const rule = new FirstMoveAtIndex(112);
        const boardSize = 15;
        const tiles = Array(boardSize * boardSize).fill({});
        const placedTilesIndices = [11, 115, 114];

        const actual = rule.isSatisfied({tiles: tiles, placedTilesIndices: placedTilesIndices});

        expect(actual).toEqual(false);
        expect(rule.errorMessage !== null).toEqual(true);
      });
    });
  });
  describe('when it is not a first move', () => {
    describe('when in the centre', () => {
      it('returns true and error message is null', () => {
        const rule = new FirstMoveAtIndex(112);
        const boardSize = 15;
        const tiles = Array(boardSize * boardSize).fill({});
        tiles[5] = {letter: {alreadyPlayed: true}};
        const placedTilesIndices = [11, 112, 113, 114];

        const actual = rule.isSatisfied({tiles: tiles, placedTilesIndices: placedTilesIndices});

        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });
    describe('when not in the centre', () => {
      it('returns true and error message is null', () => {
        const rule = new FirstMoveAtIndex(112);
        const boardSize = 15;
        const tiles = Array(boardSize * boardSize).fill({});
        tiles[5] = {letter: {alreadyPlayed: true}};
        const placedTilesIndices = [11, 115, 114];

        const actual = rule.isSatisfied({tiles: tiles, placedTilesIndices: placedTilesIndices});

        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });
  });
});