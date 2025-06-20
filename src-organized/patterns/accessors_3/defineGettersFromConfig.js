/**
 * Defines getter properties on a target object based on a configuration object.
 *
 * For each property in the config object, this function defines a getter on the target object
 * using the external vX1 function. The getter is taken from the config object, and the property
 * is set to be enumerable.
 *
 * @param {Object} targetObject - The object on which to define getter properties.
 * @param {Object} getterConfig - An object whose keys are property names and values are getter functions.
 * @returns {void}
 */
function defineGettersFromConfig(targetObject, getterConfig) {
  // Iterate over each property in the getterConfig object
  for (const propertyName in getterConfig) {
    // Define a getter property on the targetObject using vX1
    vX1(targetObject, propertyName, {
      get: getterConfig[propertyName],
      enumerable: true
    });
  }
}

module.exports = defineGettersFromConfig;