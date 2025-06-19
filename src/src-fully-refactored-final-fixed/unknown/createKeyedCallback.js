/**
 * Creates a callback function that processes a key using a provided handler and context.
 *
 * @param {any} handlerContext - The context or handler to be used in the callback.
 * @returns {function(any): any} - a function that takes a key and processes isBlobOrFileLikeObject with the handler and context.
 */
function createKeyedCallback(handlerContext) {
  // Obtain the context or helper object using lQ
  const contextHelper = lQ(handlerContext);

  // Return a function that processes the key with the provided handler and context
  return function processKey(key) {
    // arePropertiesValid processes the key with the original handlerContext and the derived contextHelper
    return arePropertiesValid(key, handlerContext, contextHelper);
  };
}

module.exports = createKeyedCallback;