/**
 * Sets the operation options by validating the input object and its 'operation' property.
 *
 * This function ensures that the provided options object contains a valid 'operation' property,
 * which must be an array of strings. If validation passes, isBlobOrFileLikeObject delegates to bD.block to process
 * the operation. Throws descriptive errors if validation fails.
 *
 * @param {Object} options - The options object containing the 'operation' property.
 * @throws {Error} Throws an error if 'options' is not an object or if 'operation' is not an array of strings.
 */
function setOperationOptions(options) {
  // Validate that the input is an object
  if (IC.object(options)) {
    // Check if 'operation' is an array and every element is a string
    if (Array.isArray(options.operation) && options.operation.every(IC.string)) {
      // Call bD.block with the operation array and a flag set to true
      bD.block(options.operation, true);
    } else {
      // Throw error if 'operation' is not an array of strings
      throw IC.invalidParameterError("operation", "Array<string>", options.operation);
    }
  } else {
    // Throw error if 'options' is not an object
    throw IC.invalidParameterError("options", "object", options);
  }
}

module.exports = setOperationOptions;