import getAnchors from '../../utils/makeMove/getAnchors';

describe('getAnchors', () => {
  describe('when all squares are empty', () => {
    it('should return the center square index', () => {
      const squares = Array(15*15).fill({});
      const stepVertical = 15;

      const actual = getAnchors(squares, stepVertical);

      expect(actual).toEqual(113);
    });
  });

  describe('when squares have letters', () => {
    it('should return correct anchor indices', () => {
      const squares = [
        {letter: undefined}, {letter: null}, {letter: {}}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: null},
        {letter: {}}, {letter: {}}, {letter: {}}, {letter: {}}, {letter: {}},
        {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: {}},
        {}, {letter: null}, {letter: null}, {letter: undefined}, {letter: {}},
      ]
      const stepVertical = 5;
      const expected = [1, 3, 5, 6, 8, 9, 15, 16, 18, 22, 23];
      
      const actual = Array.from(getAnchors(squares, stepVertical)).sort((a, b) => a - b);

      expect(actual).toEqual(expected);
    });
  });

  describe('letters on the edges', () => {
    it('should return correct anchor indices', () => {
      const squares = [
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {}},
      ];

      const stepVertical = 5;
      const expected = [1, 5, 10, 16, 19, 20, 23];

      const actual = Array.from(getAnchors(squares, stepVertical)).sort((a, b) => a - b);

      expect(actual).toEqual(expected);
    });
  })
});