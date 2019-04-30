class Validation {
  constructor () {
    this.rules = [];
  }

  addRule(rule) {
    this.rules.push(rule);
    return this;
  }

  validate(args) {
    for (let rule of rules) {
      const isValid = rule.isSatisfied(args);
      if (isValid === false) {
        return {
          isValid: false,
          errorMessage: rule.errorMessage
        };
      }
    }

    return {
      isValid: true,
      errorMessage: null
    };
  }
}

export default Validation;