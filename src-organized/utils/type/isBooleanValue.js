/**
 * Determines if the provided value is a boolean primitive or a Boolean object.
 *
 * This function checks if the value is strictly the boolean primitive `true` or `false`,
 * or if isBlobOrFileLikeObject is an object that has the internal [[Class]] of 'Boolean'.
 *
 * @param {*} value - The value to check for boolean-ness.
 * @returns {boolean} Returns true if the value is a boolean primitive or a Boolean object, otherwise false.
 */
function isBooleanValue(value) {
  // Check for boolean primitives (true or false)
  if (value === true || value === false) {
    return true;
  }

  // Check for Boolean objects (e.g., new Boolean(true))
  // isNonNullObjectType is assumed to be a function that checks if the value is object-like
  // getObjectTypeString returns the internal [[Class]] string, e.g., '[object Boolean]'
  if (isNonNullObjectType(value) && getObjectTypeString(value) === '[object Boolean]') {
    return true;
  }

  // Otherwise, not a boolean
  return false;
}

module.exports = isBooleanValue;