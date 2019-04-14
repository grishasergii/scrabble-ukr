import getWordBuildStepFromAnchor from '../../utils/makeMove/getWordBuildStepFromAnchor';

describe('getWordBuildStepFromAnchor', () => {
  describe('when letter is to the left', () => {
    it('returns 1', () => {
      const tiles = [
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
      ]
      const boardSize = 5;
      const anchorIndex = 1;
      const expected = 1;

      const actual = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);

      expect(actual).toEqual(expected);
    });

    it('returns 1', () => {
      const tiles = [
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
      ]
      const boardSize = 5;
      const anchorIndex = 13;
      const expected = 1;

      const actual = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);

      expect(actual).toEqual(expected);
    });

    it('returns 1', () => {
      const tiles = [
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: {}}, {letter: null},
      ]
      const boardSize = 5;
      const anchorIndex = 24;
      const expected = 1;

      const actual = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);

      expect(actual).toEqual(expected);
    });
  });

  describe('when letter is to the right', () => {
    it('returns 1', () => {
      const tiles = [
        {letter: null}, {letter: {}}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
      ]
      const boardSize = 5;
      const anchorIndex = 0;
      const expected = 1;

      const actual = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);

      expect(actual).toEqual(expected);
    });
  });

  describe('when letter is under the anchor', () => {
    it('returns board size', () => {
      const tiles = [
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
      ]
      const boardSize = 5;
      const anchorIndex = 0;
      const expected = 5;

      const actual = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);

      expect(actual).toEqual(expected);
    });
  });

  describe('when letter is above the anchor', () => {
    it('returns 1', () => {
      const tiles = [
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
      ]
      const boardSize = 5;
      const anchorIndex = 5;
      const expected = 5;

      const actual = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);

      expect(actual).toEqual(expected);
    });

    it('returns 1', () => {
      const tiles = [
        {letter: {}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {}},
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
      ]
      const boardSize = 5;
      const anchorIndex = 24;
      const expected = 5;

      const actual = getWordBuildStepFromAnchor(tiles, boardSize, anchorIndex);

      expect(actual).toEqual(expected);
    });
  });
});