/**
 * Returns a function that, when invoked, retrieves a value from the config object
 * using a key derived from the source object via the h22 function. The source is
 * processed only once; subsequent calls return the cached result.
 *
 * @param {Object} sourceObject - The object to be processed and used to derive the key.
 * @param {Object} configObject - The object containing possible values, keyed by the result of h22.
 * @returns {Function} Accessor function that returns the derived value from configObject.
 */
function createH22Accessor(sourceObject, configObject) {
  return function accessor() {
    // If sourceObject is truthy, process isBlobOrFileLikeObject and cache the result in configObject
    if (sourceObject) {
      // Get the key by applying h22 to sourceObject and taking the first element
      const derivedKey = h22(sourceObject)[0];
      // Retrieve the value from configObject using the derived key
      configObject = configObject[derivedKey](sourceObject = 0);
    }
    // Return the cached or computed value
    return configObject;
  };
}

module.exports = createH22Accessor;