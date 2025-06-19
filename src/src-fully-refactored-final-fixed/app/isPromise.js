/**
 * Checks whether the provided value is a Promise.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a Promise, false otherwise.
 */
const isPromise = (value) => {
  // Ensure Promise is defined in the current environment and check if value is an instance of Promise
  return typeof Promise !== "undefined" && value instanceof Promise;
};

module.exports = isPromise;
