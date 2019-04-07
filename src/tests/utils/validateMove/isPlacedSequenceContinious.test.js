import isPlacedSequenceContinious from '../../../utils/validateMove/isPlacedSequenceContinious';

describe('isPlacedSequanceContinious', () => {
  describe('when not continious', () => {
    describe('when direction is horizontal', () => {
      it('should  return false', () => {
        const squares = [
          {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
          {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
          {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
          {}, {}, {}, {}, {},
        ];

        const step = 1;
        const placedIndices = [5, 6, 8, 9];

        const actual = isPlacedSequenceContinious(placedIndices, step, squares);

        expect(actual).toEqual(false);
      });
    });

    describe('when direction is vertical', () => {
      it('should  return false', () => {
        const squares = [
          {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {}, {}, {},
          {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {}, {}, {},
          {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
          {letter: {letter: 'a'}}, {}, {}, {}, {},
          {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {}, {}, {},
        ];

        const step = 5;
        const placedIndices = [1, 6, 11, 21];

        const actual = isPlacedSequenceContinious(placedIndices, step, squares);

        expect(actual).toEqual(false);
      });
    });
  });

  describe('when continious', () => {
    describe('when word reaches edges', () => {
      describe('when direction is horizontal', () => {
        it('should return true', () => {
          const squares = [
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {}, {}, {}, {}, {},
          ];
  
          const step = 1;
          const placedIndices = [5, 6, 8, 9];
  
          const actual = isPlacedSequenceContinious(placedIndices, step, squares);
  
          expect(actual).toEqual(true);
        });
      });

      describe('when direction is vertical', () => {
        it('should return true', () => {
          const squares = [
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {letter: {letter: 'a'}}, {}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {}, {}, {},
          ];
  
          const step = 5;
          const placedIndices = [0, 5, 15];
  
          const actual = isPlacedSequenceContinious(placedIndices, step, squares);
  
          expect(actual).toEqual(true);
        });
      });
    });

    describe('when word does not reach edges', () => {
      describe('when direction is horizontal', () => {
        it('should return true', () => {
          const squares = [
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {}, {}, {}, {}, {},
          ];
  
          const step = 1;
          const placedIndices = [5, 6];
  
          const actual = isPlacedSequenceContinious(placedIndices, step, squares);
  
          expect(actual).toEqual(true);
        });
      });

      describe('when direction is vertical', () => {
        it('should return true', () => {
          const squares = [
            {}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}}, {letter: {letter: 'a'}},
            {}, {}, {}, {}, {},
          ];
  
          const step = 5;
          const placedIndices = [5, 10];
  
          const actual = isPlacedSequenceContinious(placedIndices, step, squares);
  
          expect(actual).toEqual(true);
        });
      });
    });
  });
});