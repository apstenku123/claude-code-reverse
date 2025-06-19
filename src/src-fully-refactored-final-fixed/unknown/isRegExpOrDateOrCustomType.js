/**
 * Determines if the provided value is a RegExp, Date, or matches a custom type check (isNy4TypeObject).
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a RegExp, Date, or passes the isNy4TypeObject custom check; otherwise, false.
 */
function isRegExpOrDateOrCustomType(value) {
  // Get the internal [[Class]] property string
  const typeString = Object.prototype.toString.call(value);

  // Check for RegExp or Date types, or delegate to custom type check (isNy4TypeObject)
  return (
    typeString === "[object RegExp]" ||
    typeString === "[object Date]" ||
    isNy4TypeObject(value)
  );
}

module.exports = isRegExpOrDateOrCustomType;