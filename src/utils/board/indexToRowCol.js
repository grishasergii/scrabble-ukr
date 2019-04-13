const indexToRowCol = (index, num_cols) => {
  const row = Math.floor(index / num_cols);
  const col = index % num_cols;

  return {row: row, col: col};
};

export default indexToRowCol;