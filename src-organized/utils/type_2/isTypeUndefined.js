/**
 * Checks whether the 'type' property of the given object is undefined.
 *
 * @param {Object} objectToCheck - The object whose 'type' property will be checked.
 * @returns {boolean} Returns true if the 'type' property is undefined; otherwise, false.
 */
function isTypeUndefined(objectToCheck) {
  // Return true if the 'type' property is strictly undefined
  return objectToCheck.type === undefined;
}

module.exports = isTypeUndefined;