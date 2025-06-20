/**
 * Checks if a given value exists in a Set; throws a TypeError with a custom message if not.
 *
 * @param {any} value - The value to check for existence in the set.
 * @param {Set<any>} set - The set in which to check for the value.
 * @param {string} operationDescription - a description of the operation for error messaging.
 * @returns {boolean} Returns true if the value exists in the set; otherwise, throws an error.
 */
function assertSetHasValueOrThrow(value, set, operationDescription) {
  // Check if the set contains the value
  if (set.has(value)) {
    return true;
  }
  // If not, throw a TypeError with a descriptive message
  throwTypeErrorWithMessage("Cannot " + operationDescription);
}

module.exports = assertSetHasValueOrThrow;