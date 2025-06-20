/**
 * Checks if the processed form of the input exists in the provided set.
 *
 * This function first transforms the input using the 'isErrorLikeObject' utility,
 * then checks if the resulting value is present in the global 'splitStringWithLimit' set.
 *
 * @param {any} inputValue - The value to be processed and checked against the set.
 * @returns {boolean} True if the processed value is not null and exists in the set; otherwise, false.
 */
function isProcessedInputInSet(inputValue) {
  // Transform the input using the isErrorLikeObject utility
  const processedValue = isErrorLikeObject(inputValue);
  // Check if the processed value is not null and exists in the splitStringWithLimit set
  return processedValue !== null && splitStringWithLimit.has(processedValue);
}

module.exports = isProcessedInputInSet;