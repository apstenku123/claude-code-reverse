/**
 * Defines enumerable getter properties on a target object using the provided getter functions.
 *
 * For each property in the gettersConfig object, this function uses the MJ1 utility to define
 * a property on the targetObject with a getter and sets isBlobOrFileLikeObject as enumerable.
 *
 * @param {Object} targetObject - The object on which to define the getter properties.
 * @param {Object} gettersConfig - An object whose keys are property names and values are getter functions.
 */
function defineEnumerableGetters(targetObject, gettersConfig) {
  // Iterate over each property in the gettersConfig object
  for (const propertyName in gettersConfig) {
    // Define the property on the targetObject with a getter and set isBlobOrFileLikeObject as enumerable
    MJ1(targetObject, propertyName, {
      get: gettersConfig[propertyName],
      enumerable: true
    });
  }
}

module.exports = defineEnumerableGetters;