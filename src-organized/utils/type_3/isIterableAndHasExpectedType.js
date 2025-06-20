/**
 * Checks if the provided value is iterable and matches the expected type.
 *
 * @param {any} value - The value to check for iterability and type.
 * @returns {boolean} True if the value is iterable and matches the expected type, otherwise false.
 */
function isIterableAndHasExpectedType(value) {
  // Check if value is iterable using the cacheElementDataIfApplicable utility
  const isIterable = cacheElementDataIfApplicable(value);
  // Get the type of value using the getProcessedValue utility
  const valueType = getProcessedValue(value);
  // Compare the value'createInteractionAccessor type to the expected type constant t1
  const matchesExpectedType = valueType === t1;

  return isIterable && matchesExpectedType;
}

module.exports = isIterableAndHasExpectedType;