import getWordIndicesFromAnchor from '../../../utils/validateMove/getWordIndicesFromAnchor';

describe('getWordIndicesFromAnchor', () => {
  describe('when direction is horizontal', () => {
    it('returns correct indices', () => {
      const tiles = [
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: {}}, {letter: {}}, {letter: null}, {letter: null},
        {letter: null}, {letter: {}}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null},
      ];
      const boardSize = 4;
      const step = 1;
      const startIndex = 4;

      const expected = [4 ,5];

      const actual = getWordIndicesFromAnchor(tiles, startIndex, step, boardSize)

      expect(actual).toEqual(expected);
    });

    it('returns correct indices', () => {
      const tiles = [
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: {}}, {letter: {}}, {letter: {}}, {letter: null},
        {letter: null}, {letter: {}}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null},
      ];
      const boardSize = 4;
      const step = 1;
      const startIndex = 6;

      const expected = [4, 5, 6];

      const actual = getWordIndicesFromAnchor(tiles, startIndex, step, boardSize)

      expect(actual).toEqual(expected);
    });

    it('returns correct indices', () => {
      const tiles = [
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: {}}, {letter: {}}, {letter: {}}, {letter: {}},
        {letter: {}}, {letter: {}}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null},
      ];
      const boardSize = 4;
      const step = 1;
      const startIndex = 4;

      const expected = [4, 5, 6, 7];

      const actual = getWordIndicesFromAnchor(tiles, startIndex, step, boardSize)

      expect(actual).toEqual(expected);
    });

    it('returns correct indices', () => {
      const tiles = [
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: {}}, {letter: {}}, {letter: {}}, {letter: {}},
        {letter: {}}, {letter: {}}, {letter: null}, {letter: null},
        {letter: null}, {letter: {}}, {letter: {}}, {letter: {}},
      ];
      const boardSize = 4;
      const step = 1;
      const startIndex = 14;

      const expected = [13, 14, 15];

      const actual = getWordIndicesFromAnchor(tiles, startIndex, step, boardSize)

      expect(actual).toEqual(expected);
    });
  });

  describe('when direction is vertical', () => {
    it('returns correct indices', () => {
      const tiles = [
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: {}}, {letter: {}}, {letter: null}, {letter: null},
        {letter: null}, {letter: {}}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null},
      ];
      const boardSize = 4;
      const step = 4;
      const startIndex = 9;

      const expected = [5, 9];

      const actual = getWordIndicesFromAnchor(tiles, startIndex, step, boardSize)

      expect(actual).toEqual(expected);
    });
    it('returns correct indices', () => {
      const tiles = [
        {letter: {}}, {letter: {}}, {letter: {}}, {letter: {}}, 
        {letter: {}}, {letter: {}}, {letter: {}}, {letter: {}}, 
        {letter: {}}, {letter: {}}, {letter: {}}, {letter: {}}, 
        {letter: {}}, {letter: {}}, {letter: {}}, {letter: {}}, 
      ];
      const boardSize = 4;
      const step = 4;
      const startIndex = 11;

      const expected = [3, 7, 11, 15];

      const actual = getWordIndicesFromAnchor(tiles, startIndex, step, boardSize)

      expect(actual).toEqual(expected);
    });
  });
});