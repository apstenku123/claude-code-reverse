/**
 * Determines if the provided value is a RegExp object.
 *
 * This function first checks if the value is an object-like value (using F1),
 * then verifies that its internal [[Class]] property is '[object RegExp]' (using mA).
 *
 * @param {*} value - The value to test for being a RegExp object.
 * @returns {boolean} True if the value is a RegExp object, false otherwise.
 */
function isRegExpObject(value) {
  // Check if value is object-like and its internal [[Class]] is '[object RegExp]'
  return F1(value) && mA(value) === '[object RegExp]';
}

module.exports = isRegExpObject;