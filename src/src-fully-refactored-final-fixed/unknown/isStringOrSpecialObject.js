/**
 * Determines if the input is a string or a special object type.
 *
 * This function checks if the provided value is a string, or if isBlobOrFileLikeObject is an object that:
 *   - is not considered a 'plain object' by d2()
 *   - passes the cacheElementDataIfApplicable() check (likely a custom type check)
 *   - has a type (via getProcessedValue()) equal to copyArrayUpToLength(likely a specific type constant)
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a string or a special object type, false otherwise.
 */
function isStringOrSpecialObject(value) {
  // Check if value is a string
  if (typeof value === "string") {
    return true;
  }

  // Check if value is not a plain object, passes cacheElementDataIfApplicable(), and has type copyArrayUpToLength
  const isNotPlainObject = !d2(value);
  const passesKBCheck = cacheElementDataIfApplicable(value);
  const hasSpecialType = getProcessedValue(value) === copyArrayUpToLength;

  return isNotPlainObject && passesKBCheck && hasSpecialType;
}

module.exports = isStringOrSpecialObject;
