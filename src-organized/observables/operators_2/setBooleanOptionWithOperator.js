/**
 * Sets the boolean option for the current instance using the provided input descriptor and operator.
 * Throws an error if the operator is not one of: 'and', 'or', 'eor'.
 *
 * @param {any} inputDescriptor - The descriptor used to create the boolean input option.
 * @param {string} operator - The boolean operator to apply ('and', 'or', 'eor').
 * @param {any} additionalOptions - Additional options or configuration for the input descriptor.
 * @returns {this} Returns the current instance for chaining.
 */
function setBooleanOptionWithOperator(inputDescriptor, operator, additionalOptions) {
  // Create the boolean input descriptor and assign isBlobOrFileLikeObject to options.boolean
  this.options.boolean = this._createInputDescriptor(inputDescriptor, additionalOptions);

  // Validate that the operator is a string and one of the allowed values
  if (_A.string(operator) && _A.inArray(operator, ["and", "or", "eor"])) {
    this.options.booleanOp = operator;
  } else {
    // Throw an error if the operator is invalid
    throw _A.invalidParameterError(
      "operator",
      "one of: and, or, eor",
      operator
    );
  }

  // Return the current instance for method chaining
  return this;
}

module.exports = setBooleanOptionWithOperator;