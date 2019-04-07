import isWordConnected from '../../../utils/validateMove/isWordConnected';

describe('isWordConnected', () => {
  describe('when no already played letters', () => {
    it('should return true', () => {
      const squares = [
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
      ];

      const wordIndices = [2, 7, 12, 17, 22, 27, 32];
      const step_horizontal = 1;
      const step_vertical = 5;

      const actual = isWordConnected(wordIndices, step_horizontal, step_vertical, squares);

      expect(actual).toEqual(true);
    });
  });

  describe('when not connected', () => {
    it('should return false', () => {
      const squares = [
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {letter: {alreadyPlayed: true}}, {}, {}, {}, {},
      ];

      const wordIndices = [2, 7, 12, 17, 22, 27, 32];
      const step_horizontal = 1;
      const step_vertical = 5;

      const actual = isWordConnected(wordIndices, step_horizontal, step_vertical, squares);

      expect(actual).toEqual(false);
    });
  });

  describe('when connected', () => {
    it('should return true', () => {
      const squares = [
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {letter: {alreadyPlayed: true}}, {letter: {letter: 'a'}}, {}, {},
        {}, {}, {letter: {letter: 'a'}}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
      ];

      const wordIndices = [17, 22];
      const step_horizontal = 1;
      const step_vertical = 5;

      const actual = isWordConnected(wordIndices, step_horizontal, step_vertical, squares);

      expect(actual).toEqual(true); 
    });
  });
});