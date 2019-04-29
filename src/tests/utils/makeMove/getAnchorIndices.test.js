import getAnchorIndices from '../../../utils/makeMove/getAnchorIndices';

describe('getAnchorIndices', () => {
  describe('when all tiles are empty', () => {
    it('should return the center square index', () => {
      const tiles = Array(15*15).fill({});
      const stepVertical = 15;

      const actual = getAnchorIndices(tiles, stepVertical);

      expect(actual).toEqual([113]);
    });
  });

  describe('when tiles have letters', () => {
    it('should return correct anchor indices', () => {
      const tiles = [
        {letter: undefined}, {letter: null}, {letter: {}}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: null},
        {letter: {}}, {letter: {}}, {letter: {}}, {letter: {}}, {letter: {}},
        {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: {}},
        {}, {letter: null}, {letter: null}, {letter: undefined}, {letter: {}},
      ]
      const stepVertical = 5;
      const expected = [1, 3, 5, 6, 8, 9, 15, 16, 18, 22, 23];
      
      const actual = Array.from(getAnchorIndices(tiles, stepVertical)).sort((a, b) => a - b);

      expect(actual).toEqual(expected);
    });
  });

  describe('letters on the edges', () => {
    it('should return correct anchor indices', () => {
      const tiles = [
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {}},
      ];

      const stepVertical = 5;
      const expected = [1, 5, 10, 16, 19, 20, 23];

      const actual = Array.from(getAnchorIndices(tiles, stepVertical)).sort((a, b) => a - b);

      expect(actual).toEqual(expected);
    });

    it('should return correct anchor indices', () => {
      const tiles = [
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
      ];

      const stepVertical = 5;
      const expected = [1, 6, 11, 16, 21];

      const actual = Array.from(getAnchorIndices(tiles, stepVertical)).sort((a, b) => a - b);

      expect(actual).toEqual(expected);
    });
  })
});