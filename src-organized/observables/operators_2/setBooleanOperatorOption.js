/**
 * Sets the boolean operator option for the current instance if the provided operator is valid.
 *
 * @param {string} booleanOperator - The boolean operator to set. Must be one of: 'and', 'or', 'eor'.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws an error if the provided operator is invalid.
 */
function setBooleanOperatorOption(booleanOperator) {
  // Validate that the input is a string and one of the allowed boolean operators
  if (
    cw.string(booleanOperator) &&
    cw.inArray(booleanOperator, ["and", "or", "eor"])
  ) {
    // Set the boolean operator option
    this.options.bandBoolOp = booleanOperator;
  } else {
    // Throw an error if the operator is invalid
    throw cw.invalidParameterError(
      "boolOp",
      "one of: and, or, eor",
      booleanOperator
    );
  }
  // Return the current instance for method chaining
  return this;
}

module.exports = setBooleanOperatorOption;