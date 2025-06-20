/**
 * Sets up a boolean input descriptor and validates the logical operator.
 *
 * @param {any} inputDescriptor - The input descriptor or configuration for the boolean input.
 * @param {string} logicalOperator - The logical operator to use (must be one of: 'and', 'or', 'eor').
 * @param {any} inputOptions - Additional options or context for creating the input descriptor.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws an error if the logical operator is invalid.
 */
function setBooleanInputWithOperator(inputDescriptor, logicalOperator, inputOptions) {
  // Create and assign the boolean input descriptor using the provided parameters
  this.options.boolean = this._createInputDescriptor(inputDescriptor, inputOptions);

  // Validate that the logicalOperator is a string and one of the allowed values
  if (_A.string(logicalOperator) && _A.inArray(logicalOperator, ["and", "or", "eor"])) {
    this.options.booleanOp = logicalOperator;
  } else {
    // Throw a descriptive error if the operator is invalid
    throw _A.invalidParameterError(
      "operator",
      "one of: and, or, eor",
      logicalOperator
    );
  }

  // Return the current instance for chaining
  return this;
}

module.exports = setBooleanInputWithOperator;