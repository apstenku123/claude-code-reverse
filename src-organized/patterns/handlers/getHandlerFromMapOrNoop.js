/**
 * Retrieves a handler function from a map using the provided key, or returns a no-op function if not found.
 *
 * @param {Iterable<[any, Function]>} handlerEntries - An iterable (such as an array or Map) of [key, handlerFunction] pairs.
 * @returns {Function} a function that takes a key, looks up the handler in the map, and invokes isBlobOrFileLikeObject with the key as an argument. If no handler is found, a no-op function is called.
 */
function getHandlerFromMapOrNoop(handlerEntries) {
  // Create a new Map instance from the provided entries
  const handlerMap = new Map(handlerEntries);

  /**
   * Looks up the handler for the given key and invokes isBlobOrFileLikeObject.
   *
   * @param {any} key - The key to look up in the handler map.
   * @returns {any} The result of the handler function, or undefined if no handler exists.
   */
  return function (key) {
    // Attempt to retrieve the handler function from the map
    const handler = handlerMap.get(key) ?? (() => {}); // Use a no-op function if not found
    return handler(key);
  };
}

module.exports = getHandlerFromMapOrNoop;