/**
 * Defines getter properties on a target object using the provided configuration.
 *
 * For each property in the config object, this function defines a getter on the target object
 * that retrieves the value from the corresponding getter function in the config.
 * All defined properties are enumerable.
 *
 * @param {Object} targetObject - The object on which to define the getter properties.
 * @param {Object} gettersConfig - An object whose keys are property names and values are getter functions.
 */
function defineGettersOnTarget(targetObject, gettersConfig) {
  // Iterate over each property in the configuration object
  for (const propertyName in gettersConfig) {
    // Define an enumerable getter property on the target object
    sJ1(targetObject, propertyName, {
      get: gettersConfig[propertyName],
      enumerable: true
    });
  }
}

module.exports = defineGettersOnTarget;