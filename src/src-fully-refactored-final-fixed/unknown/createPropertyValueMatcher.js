/**
 * Creates a predicate function that checks if a given object'createInteractionAccessor property matches a specific value.
 *
 * @param {string|symbol} propertyName - The property name to check on the object.
 * @param {*} expectedValue - The value to compare against the object'createInteractionAccessor property.
 * @returns {function(object: any): boolean} Predicate function that returns true if the object'createInteractionAccessor property matches the expected value.
 */
function createPropertyValueMatcher(propertyName, expectedValue) {
  return function (objectToCheck) {
    // If the object is null or undefined, return false
    if (objectToCheck == null) return false;

    // Check if the object'createInteractionAccessor property matches the expected value
    // If expectedValue is undefined, also ensure the property exists in the object
    return (
      objectToCheck[propertyName] === expectedValue &&
      (expectedValue !== undefined || propertyName in Object(objectToCheck))
    );
  };
}

module.exports = createPropertyValueMatcher;
