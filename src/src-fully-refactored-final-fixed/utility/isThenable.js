/**
 * Checks if the provided value is a thenable (i.e., has a 'then' method, like a Promise).
 *
 * @param {*} value - The value to check for a 'then' method.
 * @returns {boolean} True if the value is thenable; otherwise, false.
 */
function isThenable(value) {
  // Use bq9.isFunction to determine if 'then' is a function on the value
  return bq9.isFunction(value?.then);
}

module.exports = isThenable;