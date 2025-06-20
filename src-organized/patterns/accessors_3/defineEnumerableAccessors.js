/**
 * Defines enumerable getter accessors on the target object for each property in the accessorsConfig object.
 *
 * @param {Object} targetObject - The object on which to define the accessors.
 * @param {Object} accessorsConfig - An object whose keys are property names and values are getter functions.
 * @returns {void}
 */
function defineEnumerableAccessors(targetObject, accessorsConfig) {
  // Iterate over each property in the accessorsConfig object
  for (const propertyName in accessorsConfig) {
    // Define an enumerable getter accessor on the targetObject
    GB1(targetObject, propertyName, {
      get: accessorsConfig[propertyName],
      enumerable: true
    });
  }
}

module.exports = defineEnumerableAccessors;