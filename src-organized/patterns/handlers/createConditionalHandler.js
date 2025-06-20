/**
 * Creates a handler function that processes input based on the presence of a handler function.
 *
 * If the provided handlerFunction is null or undefined, isBlobOrFileLikeObject returns the defaultProcessor result.
 * Otherwise, isBlobOrFileLikeObject invokes the externalProcessor with the handlerFunction and the input value.
 *
 * @param {Function|null|undefined} handlerFunction - The function to handle the input, or null/undefined to use the default.
 * @returns {Function} a function that takes an input value and processes isBlobOrFileLikeObject conditionally.
 */
function createConditionalHandler(handlerFunction) {
  return function (inputValue) {
    // If no handlerFunction is provided, use the default processor
    if (handlerFunction == null) {
      return processInteractionEntries;
    }
    // Otherwise, delegate processing to the external processor
    return getNestedPropertyByPath(handlerFunction, inputValue);
  };
}

// Dependency: processInteractionEntries (formerly 'a')
// Dependency: getNestedPropertyByPath(external processor function)

module.exports = createConditionalHandler;