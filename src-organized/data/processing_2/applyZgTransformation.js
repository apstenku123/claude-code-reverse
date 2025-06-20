/**
 * Applies the transformAndProcessInput transformation to the provided input using the initializeWithPayload utility function.
 *
 * @param {any} inputValue - The value to be transformed.
 * @returns {any} The result of applying the transformAndProcessInput transformation via initializeWithPayload.
 */
function applyZgTransformation(inputValue) {
  // Call the initializeWithPayload utility function with the input value and the transformAndProcessInput transformation
  return initializeWithPayload(inputValue, transformAndProcessInput);
}

module.exports = applyZgTransformation;