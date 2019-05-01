import getDirection from '../../../utils/validateMove/getDirection';

describe('getDirection', () => {
  describe('when one tile placed', () => {
    describe('above existiong one', () => {
      it('returns vertical', () => {
        const tiles = [
          {}, {}, {letter: {}}, {}, {},
          {}, {}, {letter: {alreadyPlayed: true}}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
        ];
        const placedTilesIndices = [2];
        const boardSize = 5;

        const actual = getDirection(tiles, placedTilesIndices, boardSize);

        expect(actual).toEqual('vertical');
      });
    });
    describe('below existiong one', () => {
      it('returns vertical', () => {
        const tiles = [
          {}, {}, {letter: {alreadyPlayed: true}}, {}, {},
          {}, {}, {letter: {}}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
        ];
        const placedTilesIndices = [7];
        const boardSize = 5;

        const actual = getDirection(tiles, placedTilesIndices, boardSize);

        expect(actual).toEqual('vertical');
      });
    });
    describe('to the right of the existiong one', () => {
      it('returns horizontal', () => {
        const tiles = [
          {}, {letter: {}}, {letter: {alreadyPlayed: true}}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
        ];
        const placedTilesIndices = [1];
        const boardSize = 5;

        const actual = getDirection(tiles, placedTilesIndices, boardSize);

        expect(actual).toEqual('horizontal');
      });
    });
    describe('to the left of the existiong one', () => {
      it('returns horizontal', () => {
        const tiles = [
          {}, {letter: {alreadyPlayed: true}}, {letter: {}}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
          {}, {}, {}, {}, {},
        ];
        const placedTilesIndices = [2];
        const boardSize = 5;

        const actual = getDirection(tiles, placedTilesIndices, boardSize);

        expect(actual).toEqual('horizontal');
      });
    });
    describe('when touching multiple alreday played tiles', () => {
      it('returns horizontal', () => {
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: {alreadyPlayed: true}}, {letter: null}, {letter: null},
          {letter: null}, {letter: {alreadyPlayed: true}}, {letter: {}}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        ];
        const placedTilesIndices = [12];
        const boardSize = 5;

        const actual = getDirection(tiles, placedTilesIndices, boardSize);

        expect(actual).toEqual('horizontal'); 
      });
    });
  });
  describe('when multiple tiles are placed', () => {
    describe('horizontally', () => {
      it('returns horizontal', () => {
        const tiles = [];
        const placedTilesIndices = [12, 14];
        const boardSize = 5;

        const actual = getDirection(tiles, placedTilesIndices, boardSize);

        expect(actual).toEqual('horizontal');
      });
    });
    describe('vertically', () => {
      it('returns horizontal', () => {
        const tiles = [];
        const placedTilesIndices = [3, 8, 18];
        const boardSize = 5;

        const actual = getDirection(tiles, placedTilesIndices, boardSize);

        expect(actual).toEqual('vertical');
      });
    });
  });
});