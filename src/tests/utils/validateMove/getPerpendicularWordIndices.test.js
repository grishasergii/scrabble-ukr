import getPerpendicularWordIndices from '../../../utils/validateMove/getPerpendicularWordIndices';

describe('getPerpendicularWordIndices', () => {
  describe('when no perpendicular word', () => {
    it('should return empty array', () => {
      const squares = [
        {}, {}, {}, {}, {},
        {}, {}, {letter: {letter: 'A'}}, {}, {},
        {letter: {letter: 'A'}}, {}, {letter: {letter: 'A'}}, {}, {letter: {letter: 'A'}},
        {}, {}, {letter: {letter: 'A'}}, {}, {},
        {}, {}, {}, {}, {},
      ]
      const step = 1;
      const index = 12;
      
      const actual = getPerpendicularWordIndices(index, step, squares);

      expect(actual).toHaveLength(0);
    });
  });

  describe('when there is a perpendicular word', () => {
    describe('when direction is vertical', () => {
      describe('when it reaches board boundaries', () => {
        it('should return a sorted array of indices', () => {
          const squares = [
            {}, {letter: {letter: 'a'}}, {}, {}, {},
            {}, {letter: {letter: 'a'}}, {}, {}, {},
            {}, {letter: {letter: 'b'}}, {letter: {letter: 'a'}}, {}, {},
            {}, {letter: {letter: 'C'}}, {}, {}, {},
            {}, {letter: {letter: 'D'}}, {}, {}, {},
            {}, {letter: {letter: 'a'}}, {}, {}, {},
          ];
          const step = 5;
          const index = 11;
          const expected = [1, 6, 11, 16, 21, 26];
    
          const actual = getPerpendicularWordIndices(index, step, squares);
    
          expect(actual).toHaveLength(6);
          expect(actual).toEqual(expected);
        });
      });
  
      describe('when it does not reach board boundaries', () => {
        it('should return a sorted array of indices', () => {
          const squares = [
            {}, {}, {}, {}, {},
            {}, {letter: {letter: 'a'}}, {}, {}, {},
            {}, {letter: {letter: 'b'}}, {letter: {letter: 'a'}}, {}, {},
            {}, {letter: {letter: 'C'}}, {}, {}, {},
            {}, {letter: {letter: 'D'}}, {}, {}, {},
            {}, {}, {}, {}, {},
          ];
          const step = 5;
          const index = 11;
          const expected = [6, 11, 16, 21];
    
          const actual = getPerpendicularWordIndices(index, step, squares);
    
          expect(actual).toHaveLength(4);
          expect(actual).toEqual(expected);
        });
      });
    });

    describe('when direction is horizontsl', () => {
      it('should return a sorted array of indices', () => {
        const squares = [
          {}, {}, {letter: {letter: 'a'}}, {}, {},
          {}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {}, {},
          {}, {letter: {letter: 'b'}}, {letter: {letter: 'a'}}, {}, {},
          {}, {letter: {letter: 'C'}}, {}, {}, {},
          {}, {letter: {letter: 'D'}}, {}, {}, {},
          {}, {}, {}, {}, {},
        ];
        const step = 1;
        const index = 12;
        const expected = [11, 12];
  
        const actual = getPerpendicularWordIndices(index, step, squares);
  
        expect(actual).toHaveLength(2);
        expect(actual).toEqual(expected);
      });
    })
  });
});