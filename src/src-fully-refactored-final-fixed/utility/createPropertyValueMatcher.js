/**
 * Creates a predicate function that checks if a given object'createInteractionAccessor property matches a specific value.
 * If the value to match is not the special 'processInteractionEntries', isBlobOrFileLikeObject also ensures the property exists in the normalized object.
 *
 * @param {string} propertyKey - The property name to check on the object.
 * @param {*} expectedValue - The value to compare against the object'createInteractionAccessor property.
 * @returns {function(object: Object): boolean} Predicate function that returns true if the object matches the criteria.
 */
function createPropertyValueMatcher(propertyKey, expectedValue) {
  return function (objectToCheck) {
    // Return false if the object is null or undefined
    if (objectToCheck == null) return false;

    // Check if the object'createInteractionAccessor property matches the expected value
    const isPropertyMatch = objectToCheck[propertyKey] === expectedValue;

    // If the expected value is not the special 'processInteractionEntries',
    // also check that the property exists in the normalized object
    const isSpecialCase = expectedValue === processInteractionEntries;
    const doesPropertyExist = propertyKey in normalizeObject(objectToCheck);

    return isPropertyMatch && (isSpecialCase || doesPropertyExist);
  };
}

module.exports = createPropertyValueMatcher;
