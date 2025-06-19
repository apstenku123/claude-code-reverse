/**
 * Sets a private field on a target object after asserting access rights.
 *
 * @param {Object} targetObject - The object whose private field is being set.
 * @param {Map|WeakMap} privateFieldMap - The map representing the private field storage.
 * @param {*} newValue - The value to set for the private field.
 * @param {*} context - The context or key used for assertion (not used in this function but may be required by the assertion).
 * @returns {*} The value that was set to the private field.
 */
function setPrivateFieldWithAssertion(targetObject, privateFieldMap, newValue, context) {
  // Ensure the target object is allowed to have this private field set
  assertSetHasValueOrThrow(targetObject, privateFieldMap, "write to private field");
  // Set the new value in the private field map
  privateFieldMap.set(targetObject, newValue);
  // Return the value that was set
  return newValue;
}

module.exports = setPrivateFieldWithAssertion;