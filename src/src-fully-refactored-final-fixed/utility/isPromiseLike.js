/**
 * Checks if the provided value is promise-like (i.e., has a 'then' function).
 *
 * @param {*} value - The value to check for promise-like behavior.
 * @returns {boolean} True if the value is promise-like, otherwise false.
 */
function isPromiseLike(value) {
  // Check if the value is not null/undefined and has a 'then' function
  return bq9.isFunction(value?.then);
}

module.exports = isPromiseLike;