import getMoveBoardRackIndices from '../../../utils/makeMove/getMoveBoardRackIndices';
import getAnchorIndices from '../../../utils/makeMove/getAnchorIndices';
import getWordsAtAnchor from '../../../utils/makeMove/getWordsAtAnchor';
import getWordBuildStepFromAnchor from '../../../utils/makeMove/getWordBuildStepFromAnchor';
import isValidWordPlacement from '../../../utils/validateMove/isValidWordPlacement';

jest.mock('../../../utils/makeMove/getAnchorIndices');
jest.mock('../../../utils/makeMove/getWordsAtAnchor');
jest.mock('../../../utils/makeMove/getWordBuildStepFromAnchor');
jest.mock('../../../utils/validateMove/isValidWordPlacement');

// https://stackoverflow.com/questions/41570273/how-to-test-a-function-that-output-is-random-using-jest
const mockMath = Object.create(global.Math);
mockMath.random = () => 0;
global.Math = mockMath;

describe('getMoveBoardRackIndices', () => {
  afterEach(() => {
    getAnchorIndices.mockClear();
    getWordsAtAnchor.mockClear();
    getWordBuildStepFromAnchor.mockClear();
    isValidWordPlacement.mockClear();
  });

  describe('when no valid word placement', () => {
    it('returns null', () => {
      const tiles = [
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
      ];
      const boardSize = 5;
      const dictionary = {};
      const rack = [];

      getAnchorIndices.mockImplementation(() => [0]);

      getWordBuildStepFromAnchor.mockImplementation(() => 0);

      const wordsAtAnchor = [
        [
          {index: 0, letter: 'b'},
          {index: 5, letter: 'b'},
          {index: 10, letter: 'a'},
          {index: 15, letter: 'a'},
        ],        
        [
          {index: 7, letter: 'b'},
          {index: 12, letter: 'a'},
          {index: 17, letter: 'b'},
          {index: 22, letter: 'b'},
        ],
      ];
      getWordsAtAnchor.mockImplementation(() => wordsAtAnchor);

      isValidWordPlacement.mockImplementation(() => {
        return {isValid: false};
      });

      const boardRackIndices = getMoveBoardRackIndices(tiles, boardSize, rack, dictionary);   

      expect(boardRackIndices).toBeNull();
    });
  });

  describe('when finds valid word placement', () => {
    it('returns updated tiles and placed tiles indices', () => {
      const tiles = [
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, 
        {letter: {letter: 'a'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
      ];
      const boardSize = 5;
      const dictionary = {'a': ['a']};
      const rack = [
        {letter: 'a'}, 
        {letter: 'a'}, 
        {letter: 'b'}, 
        {letter: 'c'}, 
        {letter: 'd'},
        {letter: 'b'},
        {letter: 'b'},
        {letter: 'b'}
      ];

      const anchorIndices = [5, 6, 7, 8, 9];
      getAnchorIndices.mockImplementation(() => anchorIndices);

      const step = 5;
      getWordBuildStepFromAnchor.mockImplementation(() => step);

      const wordsAtAnchor = [
        [
          {index: 0, letter: 'b'},
          {index: 5, letter: 'b'},
          {index: 10, letter: 'a'},
          {index: 15, letter: 'a'},
        ],        
        [
          {index: 7, letter: 'b'},
          {index: 12, letter: 'a'},
          {index: 17, letter: 'b'},
          {index: 22, letter: 'b'},
        ],
      ];
      getWordsAtAnchor.mockImplementation(() => wordsAtAnchor);

      isValidWordPlacement.mockImplementation((tiles, boardSize, placedTilesIndices, dictionary) => {
        if (placedTilesIndices.length === 2) {
          if (placedTilesIndices[0] === 0 && placedTilesIndices[1] === 5) {
            return {isValid: false};
          }
        }

        return {isValid: true};
      });

      const expectedUpdatedTiles = [
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: {letter: 'b'}}, {letter: null}, {letter: null}, 
        {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, 
        {letter: {letter: 'a'}}, {letter: null}, {letter: {letter: 'b'}}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: {letter: 'b'}}, {letter: null}, {letter: null}, 
      ];

      const expectedBoardRackIndices = [
        {
          boardIndex: 7,
          rackIndex: 2
        },
        {
          boardIndex: 17,
          rackIndex: 5
        },
        {
          boardIndex: 22,
          rackIndex: 6
        }
      ];

      const boardRackIndices = getMoveBoardRackIndices(tiles, boardSize, rack, dictionary);   
      
      expect(getAnchorIndices.mock.calls.length).toBe(1);
      expect(getAnchorIndices.mock.calls[0][0]).toEqual(tiles);
      expect(getAnchorIndices.mock.calls[0][1]).toEqual(boardSize);

      expect(getWordBuildStepFromAnchor.mock.calls.length).toBe(1);
      expect(getWordBuildStepFromAnchor.mock.calls[0][0]).toEqual(tiles);
      expect(getWordBuildStepFromAnchor.mock.calls[0][1]).toEqual(boardSize);
      expect(getWordBuildStepFromAnchor.mock.calls[0][2]).toEqual(5);

      expect(getWordsAtAnchor.mock.calls.length).toBe(1);
      expect(getWordsAtAnchor.mock.calls[0][0]).toEqual(tiles);
      expect(getWordsAtAnchor.mock.calls[0][1]).toEqual(rack);
      expect(getWordsAtAnchor.mock.calls[0][2]).toEqual(dictionary);
      expect(getWordsAtAnchor.mock.calls[0][3]).toEqual(5);
      expect(getWordsAtAnchor.mock.calls[0][4]).toEqual(boardSize);
      expect(getWordsAtAnchor.mock.calls[0][5]).toEqual(step);

      expect(isValidWordPlacement.mock.calls.length).toBe(2);
      expect(isValidWordPlacement.mock.calls[0][0]).toEqual([
        {letter: {letter: 'b'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: {letter: 'b'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, 
        {letter: {letter: 'a'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
      ]);
      expect(isValidWordPlacement.mock.calls[0][1]).toEqual(boardSize);
      expect(isValidWordPlacement.mock.calls[0][2]).toEqual([0, 5]);
      expect(isValidWordPlacement.mock.calls[0][3]).toEqual(dictionary);
      expect(isValidWordPlacement.mock.calls[1][0]).toEqual([
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: {letter: 'b'}}, {letter: null}, {letter: null}, 
        {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, 
        {letter: {letter: 'a'}}, {letter: null}, {letter: {letter: 'b'}}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: {letter: 'b'}}, {letter: null}, {letter: null}, 
      ]);
      expect(isValidWordPlacement.mock.calls[1][1]).toEqual(boardSize);
      expect(isValidWordPlacement.mock.calls[1][2]).toEqual([7, 17, 22]);
      expect(isValidWordPlacement.mock.calls[1][3]).toEqual(dictionary);

      expect(boardRackIndices).toEqual(expectedBoardRackIndices);
    });
  });
});
