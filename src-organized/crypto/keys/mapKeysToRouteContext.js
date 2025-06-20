/**
 * Maps input keys (strings, arrays, or objects) to route/context pairs for further processing.
 *
 * @param {string|Array<string>|Object} keysInput - The input keys to map. Can be a space-delimited string, an array of strings, or an object whose values are recursively mapped.
 * @param {boolean} [shouldLowercase=false] - Whether to lowercase all keys during mapping.
 * @param {string} [routeContext=zd9] - The context or route name to associate with the mapped keys. Defaults to 'zd9'.
 * @returns {Object} An object mapping each key to an array: [routeContext, getConfigOrObservableStatus(key, modifier)]
 */
function mapKeysToRouteContext(keysInput, shouldLowercase = false, routeContext = zd9) {
  const mappedKeys = {};

  // Helper function to process an array of keys and assign them to mappedKeys
  function processKeys(context, keysArray) {
    // Lowercase keys if requested
    const processedKeys = shouldLowercase ? keysArray.map(key => key.toLowerCase()) : keysArray;
    processedKeys.forEach(key => {
      // Split key by '|' to separate the main key and an optional modifier
      const [mainKey, modifier] = key.split('|');
      // Assign to mappedKeys: key -> [context, getConfigOrObservableStatus(mainKey, modifier)]
      mappedKeys[mainKey] = [context, getConfigOrObservableStatus(mainKey, modifier)];
    });
  }

  if (typeof keysInput === "string") {
    // If input is a string, split by spaces and process
    processKeys(routeContext, keysInput.split(" "));
  } else if (Array.isArray(keysInput)) {
    // If input is an array, process directly
    processKeys(routeContext, keysInput);
  } else if (typeof keysInput === 'object' && keysInput !== null) {
    // If input is an object, recursively process each property
    Object.keys(keysInput).forEach(key => {
      Object.assign(
        mappedKeys,
        mapKeysToRouteContext(keysInput[key], shouldLowercase, key)
      );
    });
  }

  return mappedKeys;
}

module.exports = mapKeysToRouteContext;