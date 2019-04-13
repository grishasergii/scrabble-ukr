import indexToRowCol from '../board/indexToRowCol';

const getWordAtAnchor = (squares, rack, dictionary, anchorIndex, boardSize) => {
  // if (anchors.length === 0) {
  //   return null;
  // }

  // const anchorIndex = anchors[Math.floor(Math.random() * anchors.length)];

  const rackLetters =  rack.map(x => x.letter).sort();

  const rowCol = indexToRowCol(anchorIndex, boardSize);

};

export default getWordAtAnchor;