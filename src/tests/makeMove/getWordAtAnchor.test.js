import getWordAtAnchor from '../../utils/makeMove/getWordAtAnchor';

describe('getWordAtAnchor', () => {
  const tiles = [
    {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 't'}},
    {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'm'}}, {letter: {letter: 'a'}}, {letter: {letter: 'n'}}, {letter: {letter: 'g'}}, {letter: {letter: 'o'}},
    {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'o'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
    {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'n'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
    {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'e'}}, {letter: {letter: 'a'}}, {letter: {letter: 'r'}}, {letter: {letter: 's'}}, {letter: null},
    {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'y'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
    {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
    {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}
  ];
  const stepVertical = 8;
  const anchorIndex = 26;

  const rack = [
    {letter: 'd'},
    {letter: 'e'},
    {letter: 'a'},
    {letter: 't'},
    {letter: 'r'},
    {letter: 'e'},
    {letter: 'e'},
  ];


  describe('when step is horizontal', () => {
    const step = 1;

    describe('when there is a single match in the dictionary', () => {
      it('returns expected word', () => {
        const dictionary = {
          'aden': ['dean'],
          'zean': ['zean'],
          'eert': ['tree', 'reet']
        };
    
        const expected = [
          [
            {index: 24, letter: 'd'},
            {index: 25, letter: 'e'},
            {index: 26, letter: 'a'},
            {index: 27, letter: 'n'},
          ],
        ];
    
        const actual = getWordAtAnchor(tiles, rack, dictionary, anchorIndex, stepVertical, step);
        expect(actual).toEqual(expected);
      });
  
      describe('when the match does not fit in the placeholder', () => {
        it('returns empty array', () => {
          const dictionary = {
            'aden': ['nade'],
            'zean': ['zean'],
            'eert': ['tree', 'reet']
          };
          const expected = [];
      
          const actual = getWordAtAnchor(tiles, rack, dictionary, anchorIndex, stepVertical, step);
          expect(actual).toEqual(expected);
        });
      });
    });
  
    describe('when there are multiple matches in the dictionary', () => {
      it('returns expected words', () => {
        const dictionary = {
          'aden': ['dean', 'aden'],
          'zean': ['zean'],
          'eert': ['tree', 'reet'],
          'aednt': ['denta']
        };
  
        const expected = [
          [
            {index: 25, letter: 'd'},
            {index: 26, letter: 'e'},
            {index: 27, letter: 'n'},
            {index: 28, letter: 't'},
            {index: 29, letter: 'a'},
          ],
          [
            {index: 24, letter: 'd'},
            {index: 25, letter: 'e'},
            {index: 26, letter: 'a'},
            {index: 27, letter: 'n'},
          ],
          [
            {index: 24, letter: 'a'},
            {index: 25, letter: 'd'},
            {index: 26, letter: 'e'},
            {index: 27, letter: 'n'},
          ]
        ];
    
        const actual = getWordAtAnchor(tiles, rack, dictionary, anchorIndex, stepVertical, step);
        expect(actual).toEqual(expected);
      });
    });
  });
});