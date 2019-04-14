const getIndicesInPlaceholder = (placeholder, anchorIndex, word) => {
  const stop = Math.min(anchorIndex, placeholder.length - word.length);
  const start = Math.max(0, anchorIndex - word.length + 1);
  for (let i = start; i < stop + 1; i++) {
    const placeholderSlice = placeholder.slice(i, i+word.length);
    let canFit = true;
    for (let j = 0; j < word.length; j++) {
      if (placeholderSlice[j] === null) {
        continue;
      }

      if (word[j] !== placeholderSlice[j]) {
        canFit = false;
        break;
      }
    }

    if (canFit === false) {
      continue;
    }

    const indices = [];
    for (let l = 0; l < word.length; l++) {
      indices.push(i + l);
    }
    return indices;
  }

  return null;
}

export default getIndicesInPlaceholder;