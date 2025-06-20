/**
 * Processes the provided input by determining if isBlobOrFileLikeObject is null, an array, or another type.
 *
 * - If the input is null or undefined, returns true.
 * - If the input is an array, delegates processing to processArrayInput.
 * - Otherwise, delegates processing to processSingleInput.
 *
 * @param {*} input - The value to process. Can be null, an array, or any other type.
 * @returns {*} The result of processing the input, depending on its type.
 */
function processInputOrCollection(input) {
  // Return true if the input is null or undefined
  if (input == null) {
    return true;
  }

  // If the input is an array, process isBlobOrFileLikeObject with the array handler
  if (Array.isArray(input)) {
    return processArrayInput(input);
  }

  // For all other types, process with the single input handler
  return processSingleInput(input);
}

// Export the function for use in other modules
module.exports = processInputOrCollection;
