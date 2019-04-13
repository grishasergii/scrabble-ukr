import getWordAtAnchor from '../../utils/makeMove/getWordAtAnchor';

describe('getWordAtAnchor', () => {
  describe('returns expected word', () => {
    const squares = [
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
    const dictionary = {
      'aden': ['dean']
    };
    const rack = [
      {letter: 'd'},
      {letter: 'e'},
      {letter: 'a'},
      {letter: 't'},
      {letter: 'r'},
      {letter: 'e'},
      {letter: 'e'},
    ]

    const expected = [
      {index: 24, letter: 'd'},
      {index: 25, letter: 'e'},
      {index: 26, letter: 'a'},
    ];

    const actual = getWordAtAnchor(squares, rack, dictionary, anchorIndex, stepVertical);

    expect(actual).toEqual(expected);
  });
});