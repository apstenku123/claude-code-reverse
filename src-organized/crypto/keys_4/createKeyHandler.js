/**
 * Creates a key handler function that processes a given key using the provided context.
 *
 * @param {object} context - The context or configuration object to be used by the key handler.
 * @returns {function} - a function that takes a key and processes isBlobOrFileLikeObject using the context.
 */
function createKeyHandler(context) {
  // Prepare context data using the external lQ function
  const contextData = lQ(context);

  /**
   * Handles a single key by processing isBlobOrFileLikeObject with the provided context and context data.
   *
   * @param {any} key - The key to be processed.
   * @returns {any} - The result of processing the key with the context.
   */
  return function handleKey(key) {
    // Delegate the processing to the external arePropertiesValid function
    return arePropertiesValid(key, context, contextData);
  };
}

module.exports = createKeyHandler;