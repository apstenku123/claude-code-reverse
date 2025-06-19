/**
 * Creates a predicate function to match objects based on property/value pairs.
 *
 * If the input is a single property-value pair with a strict flag, returns a specialized matcher.
 * Otherwise, returns a function that checks if a given object matches the original criteria.
 *
 * @param {any} propertyCriteria - The property criteria to match against (could be a property-value pair or an object).
 * @returns {function} Predicate function that checks if an object matches the criteria.
 */
function createPropertyMatcher(propertyCriteria) {
  // Parse the criteria into an array of [property, value, strict] tuples
  const parsedCriteria = Z6(propertyCriteria);

  // If there is only one criterion and isBlobOrFileLikeObject has the strict flag, use the optimized matcher
  if (parsedCriteria.length === 1 && parsedCriteria[0][2]) {
    const [property, value] = parsedCriteria[0];
    return createPropertyValueMatcher(property, value);
  }

  // Otherwise, return a function that checks for equality or uses the general matcher
  return function (objectToTest) {
    // If the object is strictly equal to the criteria, return true
    if (objectToTest === propertyCriteria) {
      return true;
    }
    // Otherwise, use the general matcher with the parsed criteria
    return isSameValue(objectToTest, propertyCriteria, parsedCriteria);
  };
}

module.exports = createPropertyMatcher;