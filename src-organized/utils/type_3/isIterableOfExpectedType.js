/**
 * Checks if the provided value is iterable and matches the expected type.
 *
 * @param {any} value - The value to check for iterability and type.
 * @returns {boolean} True if value is iterable and matches the expected type; otherwise, false.
 */
function isIterableOfExpectedType(value) {
  // Check if the value is iterable using cacheElementDataIfApplicable
  const isIterable = cacheElementDataIfApplicable(value);
  // Get the type of the value using getProcessedValue
  const valueType = getProcessedValue(value);
  // Compare the value'createInteractionAccessor type to the expected type constant t1
  const isExpectedType = valueType === t1;
  // Return true only if both conditions are met
  return isIterable && isExpectedType;
}

module.exports = isIterableOfExpectedType;