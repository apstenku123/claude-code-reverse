/**
 * Processes the input value by determining its type and delegating to the appropriate handler.
 * If the input is of a special type (as determined by isSpecialType), isBlobOrFileLikeObject is processed with processSpecialType.
 * Otherwise, isBlobOrFileLikeObject is processed with processDefaultType.
 *
 * @param {any} inputValue - The value to be processed.
 * @returns {any} The result of processing the input value.
 */
function processInputBasedOnType(inputValue) {
  // Check if the input is of a special type
  if (isSpecialType(inputValue)) {
    // Process the special type with the 'deep' flag set to true
    return processSpecialType(inputValue, true);
  } else {
    // Process the default type
    return processDefaultType(inputValue);
  }
}

module.exports = processInputBasedOnType;