/**
 * Creates a function that, given a key, looks up a function in the provided map-like iterable and invokes isBlobOrFileLikeObject with the key as an argument.
 * If the key does not exist in the map, a no-op function is invoked instead.
 *
 * @param {Iterable<[any, Function]>} functionEntries - An iterable of [key, function] pairs to initialize the map.
 * @returns {Function} a function that takes a key, looks up the corresponding function, and invokes isBlobOrFileLikeObject with the key.
 */
function createFunctionInvokerFromMap(functionEntries) {
  return function invokeFunctionByKey(key) {
    // Create a new Map from the provided entries
    const functionMap = new Map(functionEntries);
    // Retrieve the function associated with the key, or use a no-op if not found
    const func = functionMap.get(key) ?? (() => {});
    // Invoke the function with the key as argument
    return func(key);
  };
}

module.exports = createFunctionInvokerFromMap;