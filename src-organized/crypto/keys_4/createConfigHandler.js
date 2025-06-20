/**
 * Returns a handler function that retrieves a callback from a configuration map and invokes isBlobOrFileLikeObject with the provided key.
 * If the key does not exist in the configuration map, a no-op function is invoked instead.
 *
 * @param {Iterable<[any, Function]>} configEntries - An iterable (such as an array or Map) of [key, handlerFunction] pairs.
 * @returns {Function} a function that takes a key and invokes the corresponding handler function with that key, or does nothing if not found.
 */
function createConfigHandler(configEntries) {
  return function handleConfig(key) {
    // Create a new Map from the provided entries to ensure Map interface
    const configMap = new Map(configEntries);
    // Retrieve the handler function for the given key, or use a no-op if not found
    const handler = configMap.get(key) ?? (() => {});
    // Invoke the handler with the key
    return handler(key);
  };
}

module.exports = createConfigHandler;