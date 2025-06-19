/**
 * Validates the provided options object and blocks the specified operations if valid.
 *
 * @param {Object} options - The options object containing the operations to block.
 * @param {Array<string>} options.operation - An array of operation names to be blocked.
 * @throws {Error} Throws an error if the options object or the operation array is invalid.
 */
function validateAndBlockOperations(options) {
  // Ensure the options parameter is a valid object
  if (IC.object(options)) {
    // Check if the 'operation' property is an array and every element is a string
    if (Array.isArray(options.operation) && options.operation.every(IC.string)) {
      // Block the specified operations
      bD.block(options.operation, true);
    } else {
      // Throw an error if 'operation' is not a valid array of strings
      throw IC.invalidParameterError("operation", "Array<string>", options.operation);
    }
  } else {
    // Throw an error if 'options' is not a valid object
    throw IC.invalidParameterError("options", "object", options);
  }
}

module.exports = validateAndBlockOperations;