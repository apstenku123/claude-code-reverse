/**
 * Determines if the provided value is either an instance of OU1.Scope or a function.
 *
 * @param {any} value - The value to be checked.
 * @returns {boolean} Returns true if the value is an instance of OU1.Scope or a function; otherwise, false.
 */
function isScopeOrFunction(value) {
  // Check if value is an instance of OU1.Scope
  // or if value is a function
  return value instanceof OU1.Scope || typeof value === "function";
}

module.exports = isScopeOrFunction;