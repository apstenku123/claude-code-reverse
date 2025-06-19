/**
 * Returns the input value unchanged.
 *
 * This utility function acts as an identity function, returning
 * whatever value is passed to isBlobOrFileLikeObject without modification. Useful as a
 * default callback or placeholder where a function is required.
 *
 * @param {*} value - The value to return unchanged.
 * @returns {*} The same value that was passed in.
 */
const identityFunction = (value) => {
  // No transformation is performed; return the input as-is
  return value;
};

module.exports = identityFunction;