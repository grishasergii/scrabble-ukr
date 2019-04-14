import getIndicesInPlaceholder from '../../utils/makeMove/getIndicesInPlaceholder';

describe('getIndicesInPlaceholder', () => {
  describe('when the word does not fit in the placeholder', () => {
    it('returns null', () => {
      const placeholder = ['x', null, null, 'n', null, null, null, null];
      const anchorIndex = 3;
      const word = 'dean';

      const actual = getIndicesInPlaceholder(placeholder, anchorIndex, word);

      expect(actual).toBeNull();      
    });
  });

  describe('when the word fits in the placeholder', () => {
    describe('when placeholder is all empty', () => {
      it('returns correct indices', () => {
        const placeholder = [null, null, null, null, null, null, null, null];
        const anchorIndex = 4;
        const word = 'beer';
  
        const expected = [1, 2, 3, 4];
  
        const actual = getIndicesInPlaceholder(placeholder, anchorIndex, word);
  
        expect(actual).toEqual(expected);
      });
    });

    describe('when anchor is in the middle', () => {
      describe('at the begining of the placeholder', () => {
        it('returns correct indices', () => {
          const placeholder = [null, null, null, 'n', null, null, null, null];
          const anchorIndex = 3;
          const word = 'dean';
    
          const expected = [0, 1, 2, 3];
    
          const actual = getIndicesInPlaceholder(placeholder, anchorIndex, word);
    
          expect(actual).toEqual(expected);
        });
      });
  
      describe('in the middle of the placeholder', () => {
        it('returns correct indices', () => {
          const placeholder = [null, null, null, 'n', null, null, null, null];
          const anchorIndex = 3;
          const word = 'dental';
    
          const expected = [1, 2, 3, 4, 5, 6];
    
          const actual = getIndicesInPlaceholder(placeholder, anchorIndex, word);
    
          expect(actual).toEqual(expected);
        });
      });
  
      describe('at the end of the placeholder', () => {
        it('returns correct indices', () => {
          const placeholder = [null, null, null, 'n', null, null, null];
          const anchorIndex = 3;
          const word = 'nuts';
    
          const expected = [3, 4, 5, 6];
    
          const actual = getIndicesInPlaceholder(placeholder, anchorIndex, word);
    
          expect(actual).toEqual(expected);
        });
  
        it('returns correct indices', () => {
          const placeholder = [null, null, null, 'n', null, 't', null];
          const anchorIndex = 3;
          const word = 'nuts';
    
          const expected = [3, 4, 5, 6];
    
          const actual = getIndicesInPlaceholder(placeholder, anchorIndex, word);
    
          expect(actual).toEqual(expected);
        });
      });

      describe('when word is equally long as placeholder', () => {
        it('returns correct indices', () => {
          const placeholder = [null, null, null, null, null, null, null, null, null];
          const anchorIndex = 3;
          const word = 'hamburger';
    
          const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
          const actual = getIndicesInPlaceholder(placeholder, anchorIndex, word);
    
          expect(actual).toEqual(expected);
        });
      });
    });

    describe('when anchor is at position 0', () => {
      it('returns correct indices', () => {
        const placeholder = [null, null, null, 'n', null, null, null];
        const anchorIndex = 0;
        const word = 'dean';
  
        const expected = [0, 1, 2, 3];
  
        const actual = getIndicesInPlaceholder(placeholder, anchorIndex, word);
  
        expect(actual).toEqual(expected);
      });
    });

    describe('when anchor is at the end', () => {
      it('returns correct indices', () => {
        const placeholder = [null, null, null, 'n', null, null, null];
        const anchorIndex = 6;
        const word = 'nuts';
  
        const expected = [3, 4, 5, 6];
  
        const actual = getIndicesInPlaceholder(placeholder, anchorIndex, word);
  
        expect(actual).toEqual(expected);
      });
    });
    
  });
});