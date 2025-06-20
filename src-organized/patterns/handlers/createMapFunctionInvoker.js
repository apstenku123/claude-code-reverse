/**
 * Creates a function that looks up a handler function from a source mapping and invokes isBlobOrFileLikeObject with the provided key.
 * If no handler is found for the given key, a no-op function is invoked instead.
 *
 * @param {Iterable<[any, Function]>} handlerEntries - An iterable of [key, handlerFunction] pairs to initialize the map.
 * @returns {Function} a function that takes a key, looks up the corresponding handler, and invokes isBlobOrFileLikeObject with the key.
 */
function createMapFunctionInvoker(handlerEntries) {
  return function invokeHandlerByKey(key) {
    // Create a new Map from the provided entries
    const handlerMap = new Map(handlerEntries);
    // Retrieve the handler function for the given key, or use a no-op if not found
    const handler = handlerMap.get(key) ?? (() => {});
    // Invoke the handler with the key as argument
    return handler(key);
  };
}

module.exports = createMapFunctionInvoker;