/**
 * Determines if the provided value is a non-null object or a function.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is not null and is of type 'object' or 'function', otherwise false.
 */
function isObjectOrFunction(value) {
  // Get the type of the value
  const valueType = typeof value;

  // Check that value is not null and is either an object or a function
  return value != null && (valueType === "object" || valueType === "function");
}

module.exports = isObjectOrFunction;