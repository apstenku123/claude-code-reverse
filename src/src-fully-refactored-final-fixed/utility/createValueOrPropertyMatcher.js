/**
 * Creates a matcher function that checks if a given value matches the target value directly,
 * or matches based on specified property-value pairs.
 *
 * If the target value can be decomposed into a single property-value pair (via parsePropertyMatchers),
 * returns a specialized property matcher. Otherwise, returns a function that checks for direct equality
 * or property-based matching.
 *
 * @param {any} targetValue - The value or property matcher definition to match against.
 * @returns {function(any): boolean} a predicate function that returns true if the input matches the target value or property criteria.
 */
function createValueOrPropertyMatcher(targetValue) {
  // Parse the target value into an array of property matchers
  const propertyMatchers = parsePropertyMatchers(targetValue);

  // If there is exactly one property matcher and isBlobOrFileLikeObject has a value, use a specialized property matcher
  if (propertyMatchers.length === 1 && propertyMatchers[0][2]) {
    // propertyMatchers[0] = [propertyName, expectedValue, isActive]
    return createPropertyMatcher(propertyMatchers[0][0], propertyMatchers[0][1]);
  }

  // Otherwise, return a function that checks for direct equality or property-based matching
  return function (input) {
    // Return true if input is strictly equal to the target value
    // or if input matches the property matchers criteria
    return input === targetValue || matchProperties(input, targetValue, propertyMatchers);
  };
}

module.exports = createValueOrPropertyMatcher;