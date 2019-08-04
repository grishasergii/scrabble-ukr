import AdjacentWordsAreValid from './AdjacentWordsAreValid';
import AllLettersInTheSameRowOrColumn from './AllLettersInTheSameRowOrColumn';
import AnyPlacedTiles from './AnyPlacedTiles';
import ContiniousSequence from './ContiniousSequence';
import PlacedLetterSequenceIsAValidWord from './PlacedLetterSequenceIsAValidWord';
import WordConnected from './WordConnected';
import Validation from '../validation/Validation';
import FirstMoveAtIndex from './FirstMoveAtIndex';

class PlayerMoveValidation extends Validation {
  constructor(firstMoveBoardIndex) {
    super();
    this.addRule(new AnyPlacedTiles())
        .addRule(new FirstMoveAtIndex(firstMoveBoardIndex))
        .addRule(new AllLettersInTheSameRowOrColumn())
        .addRule(new ContiniousSequence())
        .addRule(new WordConnected())
        .addRule(new PlacedLetterSequenceIsAValidWord())
        .addRule(new AdjacentWordsAreValid());
  }
}

export default PlayerMoveValidation;
