/**
 * Returns the result of calling the external function `f9A` with the provided argument, wrapped in an Object,
 * or returns an empty object if `f9A` is not defined or falsy.
 *
 * @param {any} sourceValue - The value to be passed as an argument to the external function `f9A`.
 * @returns {object} The result of `Object(f9A.call(sourceValue))` if `f9A` exists, otherwise an empty object.
 */
function getF9AResultOrEmptyObject(sourceValue) {
  // Check if the external function f9A is defined and truthy
  if (f9A) {
    // Call f9A with sourceValue as its context and wrap the result in an Object
    return Object(f9A.call(sourceValue));
  }
  // If f9A is not defined, return an empty object
  return {};
}

module.exports = getF9AResultOrEmptyObject;