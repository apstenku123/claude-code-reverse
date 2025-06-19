/**
 * Sets a value in a private field (represented by a WeakMap) after asserting the field exists for the given object.
 *
 * @param {Object} targetObject - The object whose private field is being set.
 * @param {WeakMap} privateFieldMap - The WeakMap representing the private field storage.
 * @param {*} valueToSet - The value to set in the private field.
 * @param {Function} assertSetHasValueOrThrow - Function to assert the private field exists for the object, throws if not.
 * @returns {*} The value that was set in the private field.
 */
function setPrivateFieldValue(targetObject, privateFieldMap, valueToSet, assertSetHasValueOrThrow) {
  // Ensure the private field exists for the target object before setting
  assertSetHasValueOrThrow(targetObject, privateFieldMap, "write to private field");
  // Set the value in the WeakMap (private field)
  privateFieldMap.set(targetObject, valueToSet);
  // Return the value that was set
  return valueToSet;
}

module.exports = setPrivateFieldValue;
