/**
 * Defines accessor properties on a target object using getter functions from a configuration object.
 *
 * For each property in the config object, this function defines a corresponding property on the target object
 * with a getter (from config) and sets isBlobOrFileLikeObject as enumerable.
 *
 * @param {Object} targetObject - The object on which to define accessor properties.
 * @param {Object} config - An object whose properties are getter functions to be used as accessors.
 * @returns {void}
 */
function defineAccessorsFromConfig(targetObject, config) {
  // Iterate over each property in the config object
  for (const propertyName in config) {
    if (Object.prototype.hasOwnProperty.call(config, propertyName)) {
      // Define an accessor property on the target object
      k31(targetObject, propertyName, {
        get: config[propertyName],
        enumerable: true
      });
    }
  }
}

module.exports = defineAccessorsFromConfig;