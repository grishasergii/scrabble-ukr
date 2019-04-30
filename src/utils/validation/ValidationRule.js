class ValidationRule {
  constructor () {
    this.errorMessage = null;
  }

  isSatisfied({}) {
    throw new Exception('not implemented');
  }
}

export default ValidationRule;