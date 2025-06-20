/**
 * Defines getter properties on a target object using a configuration object.
 *
 * For each property in the config object, this function uses RQ1 to define a getter property
 * on the target object. The getter returns the value from the config object. All properties
 * are defined as enumerable.
 *
 * @param {Object} targetObject - The object on which to define getter properties.
 * @param {Object} configObject - An object whose properties will be defined as getters on the target object.
 * @returns {void}
 */
function defineGettersFromConfig(targetObject, configObject) {
  // Iterate over all properties in the config object
  for (const propertyName in configObject) {
    // Define a getter property on the target object for each property in the config
    RQ1(targetObject, propertyName, {
      get: configObject[propertyName],
      enumerable: true
    });
  }
}

module.exports = defineGettersFromConfig;