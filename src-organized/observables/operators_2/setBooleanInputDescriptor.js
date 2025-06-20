/**
 * Sets the boolean input descriptor and operator for the current instance.
 *
 * @param {any} inputDescriptor - The input descriptor to be created.
 * @param {string} booleanOperator - The boolean operator to use (must be one of: 'and', 'or', 'eor').
 * @param {any} inputOptions - Additional options for creating the input descriptor.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws an error if the booleanOperator is invalid.
 */
function setBooleanInputDescriptor(inputDescriptor, booleanOperator, inputOptions) {
  // Create and assign the input descriptor to the options object
  this.options.boolean = this._createInputDescriptor(inputDescriptor, inputOptions);

  // Validate that the booleanOperator is a string and one of the allowed values
  if (_A.string(booleanOperator) && _A.inArray(booleanOperator, ["and", "or", "eor"])) {
    this.options.booleanOp = booleanOperator;
  } else {
    // Throw an error if the operator is invalid
    throw _A.invalidParameterError(
      "operator",
      "one of: and, or, eor",
      booleanOperator
    );
  }

  // Return the current instance for method chaining
  return this;
}

module.exports = setBooleanInputDescriptor;