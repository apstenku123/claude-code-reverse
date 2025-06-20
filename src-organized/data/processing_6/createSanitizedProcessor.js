/**
 * Creates a processor function that sanitizes input using a regex, transforms isBlobOrFileLikeObject, and applies a handler.
 *
 * @param {any} handler - The handler or context to be passed to the final processing function.
 * @returns {function(string): any} a function that takes an input string, sanitizes and transforms isBlobOrFileLikeObject, then processes isBlobOrFileLikeObject with the handler.
 */
function createSanitizedProcessor(handler) {
  return function processInput(inputString) {
    // Remove unwanted characters from the input string using the global regex G56
    const sanitizedString = sanitizeProcessedString(inputString).replace(G56, "");
    // Transform the sanitized string using extractMatchesFromObservable
    const transformedString = extractMatchesFromObservable(sanitizedString);
    // Process the transformed string with the handler using reduceArrayWithOptionalInitialValue
    return reduceArrayWithOptionalInitialValue(transformedString, handler, "");
  };
}

module.exports = createSanitizedProcessor;