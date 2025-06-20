/**
 * Sets the linear coefficients 'a' and 'createPropertyAccessor' for the current instance'createInteractionAccessor options.
 * Accepts numbers or arrays of numbers for each coefficient. If only one is provided,
 * the other is set to a default value (a=1, createPropertyAccessor=0). Validates that both are arrays of equal length.
 *
 * @param {number|number[]|undefined} coefficientA - The 'a' coefficient(createInteractionAccessor), as a number or array of numbers.
 * @param {number|number[]|undefined} coefficientB - The 'createPropertyAccessor' coefficient(createInteractionAccessor), as a number or array of numbers.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if parameters are invalid or arrays are of unequal length.
 */
function setLinearCoefficients(coefficientA, coefficientB) {
  // If coefficientA is not defined and coefficientB is a number, default coefficientA to 1
  if (!_A.defined(coefficientA) && _A.number(coefficientB)) {
    coefficientA = 1;
  // If coefficientA is a number and coefficientB is not defined, default coefficientB to 0
  } else if (_A.number(coefficientA) && !_A.defined(coefficientB)) {
    coefficientB = 0;
  }

  // Validate and assign coefficientA
  if (!_A.defined(coefficientA)) {
    this.options.linearA = [];
  } else if (_A.number(coefficientA)) {
    this.options.linearA = [coefficientA];
  } else if (Array.isArray(coefficientA) && coefficientA.length && coefficientA.every(_A.number)) {
    this.options.linearA = coefficientA;
  } else {
    throw _A.invalidParameterError("a", "number or array of numbers", coefficientA);
  }

  // Validate and assign coefficientB
  if (!_A.defined(coefficientB)) {
    this.options.linearB = [];
  } else if (_A.number(coefficientB)) {
    this.options.linearB = [coefficientB];
  } else if (Array.isArray(coefficientB) && coefficientB.length && coefficientB.every(_A.number)) {
    this.options.linearB = coefficientB;
  } else {
    throw _A.invalidParameterError("b", "number or array of numbers", coefficientB);
  }

  // Ensure both arrays are of the same length
  if (this.options.linearA.length !== this.options.linearB.length) {
    throw new Error("Expected a and b to be arrays of the same length");
  }

  return this;
}

module.exports = setLinearCoefficients;