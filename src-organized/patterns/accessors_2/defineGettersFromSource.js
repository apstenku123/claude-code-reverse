/**
 * Defines getter properties on the target object for each property in the source object.
 * Each property is defined as an enumerable getter that returns the value from the source object.
 *
 * @param {Object} targetObject - The object on which to define the getter properties.
 * @param {Object} sourceProperties - The object containing properties to define as getters on the target.
 * @returns {void}
 */
function defineGettersFromSource(targetObject, sourceProperties) {
  // Iterate over each property in the sourceProperties object
  for (const propertyName in sourceProperties) {
    // Define an enumerable getter property on the targetObject
    yX1(targetObject, propertyName, {
      get: sourceProperties[propertyName],
      enumerable: true
    });
  }
}

module.exports = defineGettersFromSource;
