/**
 * Checks if the provided value is valid and matches the expected type.
 *
 * This function first verifies that the input value passes the validity check (using cacheElementDataIfApplicable),
 * and then checks if its type (as determined by II) matches the expected type constant.
 *
 * @param {any} value - The value to validate and check the type of.
 * @param {any} expectedType - The expected type constant to compare against.
 * @returns {boolean} True if the value is valid and of the expected type; otherwise, false.
 */
function isValidAndOfExpectedType(value, expectedType) {
  // Check if the value is valid using the cacheElementDataIfApplicable function
  const isValid = cacheElementDataIfApplicable(value);
  // Determine the type of the value using II and compare with the expected type
  const isExpectedType = II(value) === expectedType;
  // Return true only if both checks pass
  return isValid && isExpectedType;
}

module.exports = isValidAndOfExpectedType;
