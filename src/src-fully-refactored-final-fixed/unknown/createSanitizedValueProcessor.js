/**
 * Creates a processor function that sanitizes an input string and processes isBlobOrFileLikeObject with a given observable.
 *
 * @param {any} sourceObservable - The observable or context to be used in processing.
 * @returns {function(string): any} - a function that takes a string input, sanitizes isBlobOrFileLikeObject, and processes isBlobOrFileLikeObject.
 */
function createSanitizedValueProcessor(sourceObservable) {
  /**
   * Processes the input string by sanitizing and transforming isBlobOrFileLikeObject, then applies further processing.
   *
   * @param {string} inputValue - The input string to be sanitized and processed.
   * @returns {any} - The result of processing the sanitized input with the observable.
   */
  return function processInputValue(inputValue) {
    // Apply sanitizeProcessedString to the input, then remove matches of G56 (likely a regex), then transform with extractMatchesFromObservable
    const sanitizedValue = extractMatchesFromObservable(sanitizeProcessedString(inputValue).replace(G56, ""));
    // Pass the sanitized value, the observable, and an empty string to reduceArrayWithOptionalInitialValue for final processing
    return reduceArrayWithOptionalInitialValue(sanitizedValue, sourceObservable, "");
  };
}

module.exports = createSanitizedValueProcessor;