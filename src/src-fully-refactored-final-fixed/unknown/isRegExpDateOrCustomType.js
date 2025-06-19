/**
 * Determines if the provided value is a RegExp, Date, or matches a custom type check.
 *
 * @param {any} value - The value to check the type of.
 * @returns {boolean} True if the value is a RegExp, Date, or passes the isNy4TypeObject custom type check; otherwise, false.
 */
function isRegExpDateOrCustomType(value) {
  // Get the internal [[Class]] property string of the value
  const typeString = Object.prototype.toString.call(value);

  // Check for RegExp or Date types, or defer to the custom type check (isNy4TypeObject)
  return (
    typeString === '[object RegExp]' ||
    typeString === '[object Date]' ||
    isNy4TypeObject(value)
  );
}

module.exports = isRegExpDateOrCustomType;