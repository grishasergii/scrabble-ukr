import indexToRowCol from '../../../utils/board/indexToRowCol';

describe('indexToRowCol', () => {
  describe('when square board', () => {
    it('returns correct row and col', () => {
      const num_cols = 15;
      const index = 0;
      
      const expected_row = 0;
      const expected_col = 0;

      const {row, col} = indexToRowCol(index, num_cols);

      expect(col).toEqual(expected_col);
      expect(row).toEqual(expected_row);
    });

    it('returns correct row and col', () => {
      const num_cols = 15;
      const index = 30;
      
      const expected_row = 2;
      const expected_col = 0;

      const {row, col} = indexToRowCol(index, num_cols);

      expect(col).toEqual(expected_col);
      expect(row).toEqual(expected_row);
    });

    it('returns correct row and col', () => {
      const num_cols = 15;
      const index = 51;
      
      const expected_row = 3;
      const expected_col = 6;

      const {row, col} = indexToRowCol(index, num_cols);

      expect(col).toEqual(expected_col);
      expect(row).toEqual(expected_row);
    });

    it('returns correct row and col', () => {
      const num_cols = 15;
      const index = 224;
      
      const expected_row = 14;
      const expected_col = 14;

      const {row, col} = indexToRowCol(index, num_cols);

      expect(col).toEqual(expected_col);
      expect(row).toEqual(expected_row);
    });
  });

  describe('when not square board', () => {
    it('returns correct row and col', () => {
      const num_cols = 15;
      const index = 30;
      
      const expected_row = 2;
      const expected_col = 0;

      const {row, col} = indexToRowCol(index, num_cols);

      expect(col).toEqual(expected_col);
      expect(row).toEqual(expected_row);
    });

    it('returns correct row and col', () => {
      const num_cols = 9;
      const index = 35;
      
      const expected_row = 3;
      const expected_col = 8;

      const {row, col} = indexToRowCol(index, num_cols);

      expect(col).toEqual(expected_col);
      expect(row).toEqual(expected_row);
    });

    it('returns correct row and col', () => {
      const num_cols = 9;
      const index = 20;
      
      const expected_row = 2;
      const expected_col = 2;

      const {row, col} = indexToRowCol(index, num_cols);

      expect(col).toEqual(expected_col);
      expect(row).toEqual(expected_row);
    });

    it('returns correct row and col', () => {
      const num_cols = 9;
      const index = 0;
      
      const expected_row = 0;
      const expected_col = 0;

      const {row, col} = indexToRowCol(index, num_cols);

      expect(col).toEqual(expected_col);
      expect(row).toEqual(expected_row);
    });

    it('returns correct row and col', () => {
      const num_cols = 4;
      const index = 23;
      
      const expected_row = 5;
      const expected_col = 3;

      const {row, col} = indexToRowCol(index, num_cols);

      expect(col).toEqual(expected_col);
      expect(row).toEqual(expected_row);
    });

    it('returns correct row and col', () => {
      const num_cols = 4;
      const index = 11;
      
      const expected_row = 2;
      const expected_col = 3;

      const {row, col} = indexToRowCol(index, num_cols);

      expect(col).toEqual(expected_col);
      expect(row).toEqual(expected_row);
    });

    it('returns correct row and col', () => {
      const num_cols = 4;
      const index = 4;
      
      const expected_row = 1;
      const expected_col = 0;

      const {row, col} = indexToRowCol(index, num_cols);

      expect(col).toEqual(expected_col);
      expect(row).toEqual(expected_row);
    });
  });
});