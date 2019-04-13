import rowColToIndex from '../../utils/board/rowColToIndex';

describe('rowColToIndex', () => {
  it('returns correct index', () => {
    const row = 3;
    const col = 2;
    const numCols = 4;
    const expected = 14;

    const actual = rowColToIndex(row, col, numCols);

    expect(actual).toEqual(expected);
  });

  it('returns correct index', () => {
    const row = 0;
    const col = 0;
    const numCols = 4;
    const expected = 0;

    const actual = rowColToIndex(row, col, numCols);

    expect(actual).toEqual(expected);
  });

  it('returns correct index', () => {
    const row = 5;
    const col = 3;
    const numCols = 4;
    const expected = 23;

    const actual = rowColToIndex(row, col, numCols);

    expect(actual).toEqual(expected);
  });

  it('returns correct index', () => {
    const row = 14;
    const col = 14;
    const numCols = 15;
    const expected = 224;

    const actual = rowColToIndex(row, col, numCols);

    expect(actual).toEqual(expected);
  });
});