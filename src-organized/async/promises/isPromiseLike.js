/**
 * Determines if the provided value is a promise-like object.
 *
 * a promise-like object is any object that is not null and has a 'then' method of type function.
 *
 * @param {any} value - The value to check for promise-like characteristics.
 * @returns {boolean} True if the value is promise-like; otherwise, false.
 */
const isPromiseLike = (value) => {
  // Check that value is not null, is an object, and has a 'then' method of type function
  return value !== null && typeof value === "object" && typeof value.then === "function";
};

module.exports = isPromiseLike;
