import getWordsWithScore from '../../../utils/score/getWordsWithScore';

describe('getWordsWithScore', () => {
  describe('when direction is horizontal', () => {
    describe('when multiple words are created', () => {
      it('correctly identifies and scores all words', () => {
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: {letter: 'a', value: 1}}, {letter: {letter: 'b', value: 1}}, {letter: {letter: 'c', value: 1}}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'd', value: 1}}, {letter: {letter: 'e', value: 1}}, 
          {letter: null}, {letter: null}, {letter: {letter: 'f', value: 1}}, {letter: {letter: 'g', value: 1}}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        ];
        const boardSize = 5;
        const placedTilesIndices = [7, 8, 9];
        const direction = 'horizontal';

        const expected = [
          {
            word: 'abc',
            score: 3
          },
          {
            word: 'bdg',
            score: 3
          },
          {
            word: 'ce',
            score: 2
          }
        ];

        const actual = getWordsWithScore(tiles, placedTilesIndices, boardSize, direction);

        expect(actual).toEqual(expected);
      });
    });
  });
});
