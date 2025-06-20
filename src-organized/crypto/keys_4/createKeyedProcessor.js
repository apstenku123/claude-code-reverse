/**
 * Creates a processor function that applies a transformation to a given key using the provided context and a cached value.
 *
 * @param {any} context - The context or configuration object to be used by the processor.
 * @returns {function(any): any} - a function that takes a key and processes isBlobOrFileLikeObject using the context and cached value.
 */
function createKeyedProcessor(context) {
  // Obtain a cached value or helper based on the provided context
  const cachedHelper = lQ(context);

  /**
   * Processes the given key using the original context and the cached helper.
   * @param {any} key - The key or value to process.
   * @returns {any} - The result of processing the key.
   */
  return function processKey(key) {
    // Delegate the processing to the external 'arePropertiesValid' function
    return arePropertiesValid(key, context, cachedHelper);
  };
}

module.exports = createKeyedProcessor;