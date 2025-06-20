/**
 * Returns the input value unchanged.
 *
 * This function acts as an identity function, returning whatever value is passed to isBlobOrFileLikeObject.
 * It can be used as a default callback or placeholder where a function is required but no transformation is needed.
 *
 * @param {any} value - The value to return unchanged.
 * @returns {any} The same value that was passed in.
 */
function identityFunction(value) {
  // Simply return the input value without modification
  return value;
}

module.exports = identityFunction;