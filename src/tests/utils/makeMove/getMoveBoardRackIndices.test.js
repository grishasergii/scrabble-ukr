import getMoveBoardRackIndices from '../../../utils/makeMove/getMoveBoardRackIndices';
import getAnchorIndices from '../../../utils/makeMove/getAnchorIndices';
import getWordBuildStepFromAnchor from '../../../utils/makeMove/getWordBuildStepFromAnchor';

jest.mock('../../../utils/makeMove/getAnchorIndices');
jest.mock('../../../utils/makeMove/getWordBuildStepFromAnchor');

// https://stackoverflow.com/questions/41570273/how-to-test-a-function-that-output-is-random-using-jest
const mockMath = Object.create(global.Math);
mockMath.random = () => 0;
global.Math = mockMath;

describe('getMoveBoardRackIndices', () => {
  afterEach(() => {
    getAnchorIndices.mockClear();
    getWordBuildStepFromAnchor.mockClear();
  });

  describe('when everything is empty', () => {
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

      getWordBuildStepFromAnchor.mockImplementation(() => 1);

      const boardRackIndices = getMoveBoardRackIndices(tiles, boardSize, rack, dictionary);   

      expect(boardRackIndices).toBeNull();
    });
  });

  describe('when letters from rack can form a word', () => {
    describe('when word can not fit the board', () => {
      it('returns null', () => {
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: {letter: 'n'}}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: {letter: 'd'}}, {letter: null}, {letter: null}, {letter: null}, 
        ];
        const dictionary = {'aert': ['tear']};
        const boardSize = 5;
        const rack = [{letter: 't'}, {letter: 'e'}, {letter: 'r'}, {letter: 's'}];
        getAnchorIndices.mockImplementation(() => [12, 15, 20]);
        getWordBuildStepFromAnchor.mockImplementation(() => 1);      
        
        const actual = getMoveBoardRackIndices(tiles, boardSize, rack, dictionary); 

        expect(actual).toBeNull();
      });
    });
  });

  describe('when finds valid word placement', () => {
    describe('when acnhor is at column 0', () => {
      it('returns updated tiles and placed tiles indices', () => {
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: {letter: 'e'}}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, {letter: null}, 
          {letter: null}, {letter: {letter: 'r'}}, {letter: null}, {letter: null}, {letter: null}, 
        ];
        const boardSize = 5;
        const dictionary = {'aert': ['tear']};
        const rack = [
          {letter: 't'}, 
          {letter: 'r'}, 
          {letter: 'c'}, 
          {letter: 'a'},
        ];
  
        const anchorIndices = [10, 12, 17];
        getAnchorIndices.mockImplementation(() => anchorIndices);
  
        const step = 1;
        getWordBuildStepFromAnchor.mockImplementation(() => step);
  
        const expectedBoardRackIndices = [
          {
            boardIndex: 10,
            rackIndex: 0
          },
          {
            boardIndex: 12,
            rackIndex: 3
          },
          {
            boardIndex: 13,
            rackIndex: 1
          },
        ];
  
        const boardRackIndices = getMoveBoardRackIndices(tiles, boardSize, rack, dictionary);   
        
        expect(boardRackIndices).toEqual(expectedBoardRackIndices);
      });
    });

    it('returns updated tiles and placed tiles indices', () => {
      const tiles = [
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: null}, {letter: null}, 
        {letter: {letter: 'b'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
        {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, 
      ];
      const boardSize = 5;
      const dictionary = {'abc': ['cab']};
      const rack = [
        {letter: 'a'}, 
        {letter: 'b'}, 
        {letter: 'c'}, 
        {letter: 'd'},
      ];

      const anchorIndices = [5];
      getAnchorIndices.mockImplementation(() => anchorIndices);

      const step = 5;
      getWordBuildStepFromAnchor.mockImplementation(() => step);

      const expectedBoardRackIndices = [
        {
          boardIndex: 5,
          rackIndex: 2
        }
      ];

      const boardRackIndices = getMoveBoardRackIndices(tiles, boardSize, rack, dictionary);   
      
      expect(boardRackIndices).toEqual(expectedBoardRackIndices);
    });
  });
});
