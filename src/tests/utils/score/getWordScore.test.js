import getWordScore from '../../../utils/score/getWordScore';

describe('getWordScore', () => {
  describe('when 7 tiles are placed', () => {
    it('adds 50 points bonus to the word value', () => {
      const tiles = [
        {letter: {value: 1, alreadyPlayed: true}}, 
        {letter: {value: 1, alreadyPlayed: false}}, 
        {letter: {value: 1, alreadyPlayed: false}}, 
        {letter: {value: 1, alreadyPlayed: false}}, 
        {letter: {value: 1, alreadyPlayed: false}}, 
        {letter: {value: 1, alreadyPlayed: false}}, 
        {letter: {value: 1, alreadyPlayed: false}}, 
        {letter: {value: 1, alreadyPlayed: true}}, 
        {letter: {value: 1, alreadyPlayed: false}}
      ];
      const wordIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

      const expected = 59;
      const actual = getWordScore(wordIndices, tiles);

      expect(actual).toEqual(expected);
    });
  });
  describe('when 6 tiles are placed', () => {
    it('does not add 50 points bonus to the word value', () => {
      const tiles = [
        {letter: {value: 1, alreadyPlayed: true}}, 
        {letter: {value: 1, alreadyPlayed: true}}, 
        {letter: {value: 1, alreadyPlayed: false}}, 
        {letter: {value: 1, alreadyPlayed: false}}, 
        {letter: {value: 1, alreadyPlayed: false}}, 
        {letter: {value: 1, alreadyPlayed: false}}, 
        {letter: {value: 1, alreadyPlayed: false}}, 
        {letter: {value: 1, alreadyPlayed: true}}, 
        {letter: {value: 1, alreadyPlayed: false}}
      ];
      const wordIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

      const expected = 9;
      const actual = getWordScore(wordIndices, tiles);

      expect(actual).toEqual(expected);
    });
  });
});