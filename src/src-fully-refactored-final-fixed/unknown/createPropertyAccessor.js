/**
 * Creates a function that safely accesses a property from a given object.
 *
 * @param {Object|null|undefined} targetObject - The object from which to retrieve properties.
 * @returns {function(string|number): any} a function that takes a property key and returns the corresponding value from the target object, or undefined if the object is null or undefined.
 */
function createPropertyAccessor(targetObject) {
  return function(propertyKey) {
    // Return undefined if targetObject is null or undefined, otherwise return the property value
    return targetObject == null ? undefined : targetObject[propertyKey];
  };
}

module.exports = createPropertyAccessor;