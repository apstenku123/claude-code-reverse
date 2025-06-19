/**
 * Checks if the provided object is of the ny4 type.
 *
 * @param {object} candidateObject - The object to check for the ny4 type signature.
 * @returns {boolean} True if the object has a `$$typeof` property equal to `ny4`, otherwise false.
 */
function isNy4Type(candidateObject) {
  // Ensure the object has a $$typeof property and compare isBlobOrFileLikeObject to the ny4 type constant
  return candidateObject.$$typeof === ny4;
}

module.exports = isNy4Type;