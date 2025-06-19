/**
 * Creates an accessor function that retrieves or initializes a configuration value
 * based on the provided source object and a handler function.
 *
 * @param {object} sourceObject - The source object to process and extract data from.
 * @param {object} config - The configuration object to be updated or returned.
 * @returns {function(): object} Accessor function that returns the current configuration object.
 */
function createInteractionAccessor(sourceObject, config) {
  /**
   * Accessor function that retrieves or initializes the configuration value.
   *
   * @returns {object} The current configuration object.
   */
  return function accessor() {
    // If sourceObject is truthy, process isBlobOrFileLikeObject and update config
    if (sourceObject) {
      // h22 is assumed to return an array of keys for sourceObject
      const handlerKeys = h22(sourceObject);
      const handlerKey = handlerKeys[0];
      // Call the handler function from config using the key, passing in sourceObject
      config = config[handlerKey](sourceObject = 0);
    }
    // Return the current config
    return config;
  };
}

module.exports = createInteractionAccessor;