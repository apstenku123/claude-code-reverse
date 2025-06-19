/**
 * Creates a predicate function that checks if a given value matches specific criteria.
 * If the criteria array contains exactly one entry and that entry has a truthy third element,
 * isBlobOrFileLikeObject returns a specialized property-value matcher. Otherwise, isBlobOrFileLikeObject returns a function that checks
 * for strict equality or uses a custom matcher for more complex criteria.
 *
 * @param {any} targetValue - The value or criteria to match against.
 * @returns {function(any): boolean} Predicate function that returns true if the input matches the criteria.
 */
function createValueMatcher(targetValue) {
  // Parse the target value into an array of criteria using Z6
  const criteriaArray = Z6(targetValue);

  // If there is exactly one criterion and its third element is truthy,
  // use the specialized property-value matcher
  if (criteriaArray.length === 1 && criteriaArray[0][2]) {
    const [property, value] = criteriaArray[0];
    return createPropertyValueMatcher(property, value);
  }

  // Otherwise, return a function that checks for strict equality or uses isSameValue for complex matching
  return function (inputValue) {
    return inputValue === targetValue || isSameValue(inputValue, targetValue, criteriaArray);
  };
}

module.exports = createValueMatcher;