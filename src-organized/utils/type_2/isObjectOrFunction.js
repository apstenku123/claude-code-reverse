/**
 * Checks if the provided value is not null and is of type 'object' or 'function'.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} Returns true if the value is an object or function and not null, otherwise false.
 */
function isObjectOrFunction(value) {
  // Get the type of the value
  const valueType = typeof value;
  // Check that value is not null and is either an object or a function
  return value != null && (valueType === "object" || valueType === "function");
}

module.exports = isObjectOrFunction;