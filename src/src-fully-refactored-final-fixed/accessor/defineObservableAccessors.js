/**
 * Defines accessor properties on the given target object using the provided configuration object.
 * Each property in the configuration object is added as a getter on the target object,
 * and is marked as enumerable.
 *
 * @param {Object} targetObject - The object on which to define accessor properties.
 * @param {Object} accessorConfig - An object where each key is the property name and the value is the getter function.
 */
function defineObservableAccessors(targetObject, accessorConfig) {
  // Iterate over each property in the accessor configuration
  for (const propertyName in accessorConfig) {
    // Define the property on the target object with a getter and make isBlobOrFileLikeObject enumerable
    NB1(targetObject, propertyName, {
      get: accessorConfig[propertyName],
      enumerable: true
    });
  }
}

module.exports = defineObservableAccessors;