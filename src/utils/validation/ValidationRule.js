class ValidationRule {
  constructor () {
    this.errorMessage = null;
  }

  isSatisfied(args = {}) {
    throw new Error('not implemented');
  }
}

export default ValidationRule;