/**
 * Checks if the provided value is an instance of Promise.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a Promise instance and Promise is defined, otherwise false.
 */
const isPromiseInstance = (value) => {
  // Ensure Promise exists in the current environment and check if value is a Promise
  return typeof Promise !== "undefined" && value instanceof Promise;
};

module.exports = isPromiseInstance;
