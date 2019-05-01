import AdjacentWordsAreValid from './AdjacentWordsAreValid';
import PlacedLetterSequenceIsAValidWord from './PlacedLetterSequenceIsAValidWord';
import WordConnected from './WordConnected';
import Validation from '../validation/Validation';

class ComputerMoveValidation extends Validation {
  constructor() {
    super();
    this.addRule(new WordConnected())
        .addRule(new PlacedLetterSequenceIsAValidWord())
        .addRule(new AdjacentWordsAreValid());
  }
}

export default ComputerMoveValidation;
