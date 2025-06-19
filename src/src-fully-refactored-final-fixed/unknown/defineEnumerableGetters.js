/**
 * Defines enumerable getter properties on a target object based on a source of getter functions.
 *
 * For each property in the gettersConfig object, this function defines a property on the targetObject
 * with a getter function and sets the property as enumerable.
 *
 * @param {Object} targetObject - The object on which to define the getter properties.
 * @param {Object} gettersConfig - An object whose properties are getter functions to be defined on the targetObject.
 * @returns {void}
 */
function defineEnumerableGetters(targetObject, gettersConfig) {
  // Iterate over each property in the gettersConfig object
  for (const propertyName in gettersConfig) {
    // Define an enumerable getter property on the targetObject
    kX1(targetObject, propertyName, {
      get: gettersConfig[propertyName],
      enumerable: true
    });
  }
}

module.exports = defineEnumerableGetters;
