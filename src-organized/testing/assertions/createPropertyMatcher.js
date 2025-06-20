/**
 * Creates a predicate function that checks if a given object'createInteractionAccessor property matches a specific value.
 *
 * @param {string} propertyName - The name of the property to check on the target object.
 * @param {any} expectedValue - The value to compare against the object'createInteractionAccessor property.
 * @returns {function(object: any): boolean} - Predicate function that returns true if the object'createInteractionAccessor property matches the expected value.
 */
function createPropertyMatcher(propertyName, expectedValue) {
  return function (targetObject) {
    // If the target object is null or undefined, return false
    if (targetObject == null) return false;
    // Check if the property matches the expected value
    // If expectedValue is undefined, also ensure the property exists in the object
    return (
      targetObject[propertyName] === expectedValue &&
      (expectedValue !== undefined || propertyName in Object(targetObject))
    );
  };
}

module.exports = createPropertyMatcher;