/**
 * Copies all own enumerable properties from the source object to the target object.
 *
 * @param {Object} sourceObject - The object whose own properties will be copied.
 * @param {Object} targetObject - The object to which properties will be copied.
 * @returns {void}
 *
 * This function iterates over all enumerable properties of the source object and,
 * for each property that is an own property (not inherited), assigns its value to
 * the target object under the same property key. Existing properties on the target
 * object with the same key will be overwritten.
 */
function copyOwnProperties(sourceObject, targetObject) {
  // Iterate over all enumerable properties in the source object
  for (const propertyKey in sourceObject) {
    // Only copy if the property is an own property (not inherited)
    if (Object.prototype.hasOwnProperty.call(sourceObject, propertyKey)) {
      targetObject[propertyKey] = sourceObject[propertyKey];
    }
  }
}

module.exports = copyOwnProperties;
