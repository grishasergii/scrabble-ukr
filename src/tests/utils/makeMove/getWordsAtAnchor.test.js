import getWordsAtAnchor from '../../../utils/makeMove/getWordsAtAnchor';

describe('getWordAtAnchor', () => {
  const tiles = [
    {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 't'}},
    {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'm'}}, {letter: {letter: 'a'}}, {letter: {letter: 'n'}}, {letter: {letter: 'g'}}, {letter: {letter: 'o'}},
    {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'o'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
    {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'n', alreadyPlayed: true}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
    {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'e'}}, {letter: {letter: 'a'}}, {letter: {letter: 'r'}}, {letter: {letter: 's'}}, {letter: null},
    {letter: null}, {letter: null}, {letter: null}, {letter: {letter: 'y'}}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
    {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
    {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null}
  ];
  const stepVertical = 8;
  const anchorIndex = 26;

  const rack = [
    {letter: 'd', score: 1, color: 'blue'},
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
    
        const actual = getWordsAtAnchor(tiles, rack, dictionary, anchorIndex, stepVertical, step);
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
      
          const actual = getWordsAtAnchor(tiles, rack, dictionary, anchorIndex, stepVertical, step);
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
          'adent': ['denta']
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
    
        const actual = getWordsAtAnchor(tiles, rack, dictionary, anchorIndex, stepVertical, step);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('when step is vertical', () => {
    const step = 8;

    describe('when there is no match', () => {
      it('returns empty list', () => {
        const dictionary = { };
        
        const anchorIndex = 5;
        
        const expected = [];
    
        const actual = getWordsAtAnchor(tiles, rack, dictionary, anchorIndex, stepVertical, step);
        expect(actual).toEqual(expected);
      });
    });

    describe('when there are multiple matches in the dictionary', () => {
      it('returns expected words', () => {
        const dictionary = {
          'aden': ['dean', 'aden'],
          'eert': ['tree', 'reet'],
          'eenrt': ['enter'],
          'an': ['an']
        };
        
        const anchorIndex = 5;
        
        const expected = [
          [
            {index: 5, letter: 'e'},
            {index: 13, letter: 'n'},
            {index: 21, letter: 't'},
            {index: 29, letter: 'e'},
            {index: 37, letter: 'r'},
          ],
          [
            {index: 5, letter: 'a'},
            {index: 13, letter: 'n'},
          ],
        ];
    
        const actual = getWordsAtAnchor(tiles, rack, dictionary, anchorIndex, stepVertical, step);
        expect(actual).toEqual(expected);
      });
    });
  });
});