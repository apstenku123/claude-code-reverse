/**
 * Defines enumerable getter properties on the target object for each property in the config object.
 *
 * For each property in the config object, this function uses UQ1 to define a getter on the target object
 * that returns the corresponding value from the config object. The defined properties are enumerable.
 *
 * @param {Object} targetObject - The object on which to define getter properties.
 * @param {Object} configObject - An object whose properties will be defined as getters on the target object.
 * @returns {void}
 */
function defineObservableGetters(targetObject, configObject) {
  // Iterate over each property in the configObject
  for (const propertyName in configObject) {
    // Define an enumerable getter property on the targetObject
    UQ1(targetObject, propertyName, {
      get: configObject[propertyName],
      enumerable: true
    });
  }
}

module.exports = defineObservableGetters;