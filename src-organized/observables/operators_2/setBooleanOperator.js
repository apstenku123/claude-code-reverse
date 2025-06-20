/**
 * Sets the boolean operator for band operations if the provided operator is valid.
 *
 * @function setBooleanOperator
 * @param {string} booleanOperator - The boolean operator to set. Must be one of: 'and', 'or', 'eor'.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws an error if the booleanOperator is invalid.
 */
function setBooleanOperator(booleanOperator) {
  // Check if the provided value is a string and is one of the allowed boolean operators
  if (
    cw.string(booleanOperator) &&
    cw.inArray(booleanOperator, ["and", "or", "eor"])
  ) {
    // Set the operator in the options object
    this.options.bandBoolOp = booleanOperator;
  } else {
    // Throw an error if the operator is invalid
    throw cw.invalidParameterError(
      "boolOp",
      "one of: and, or, eor",
      booleanOperator
    );
  }
  return this;
}

module.exports = setBooleanOperator;
