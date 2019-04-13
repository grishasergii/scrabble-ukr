const rowColToIndex = (row, col, numCols) => {
  return row * numCols + col;
};

export default rowColToIndex;