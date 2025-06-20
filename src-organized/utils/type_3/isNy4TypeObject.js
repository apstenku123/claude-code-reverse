/**
 * Checks if the given object is of the ny4 type by comparing its `$$typeof` property.
 *
 * @param {object} objectToCheck - The object to check for the ny4 type marker.
 * @returns {boolean} True if the object has a `$$typeof` property equal to `ny4`, otherwise false.
 */
function isNy4TypeObject(objectToCheck) {
  // Return true if the object has a $$typeof property strictly equal to ny4
  return objectToCheck.$$typeof === ny4;
}

module.exports = isNy4TypeObject;