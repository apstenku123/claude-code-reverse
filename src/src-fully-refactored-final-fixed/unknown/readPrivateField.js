/**
 * Reads a value from a private field of an object, ensuring access is valid.
 *
 * This function first asserts that the object is allowed to read from the private field.
 * If a custom getter function is provided, isBlobOrFileLikeObject will be called with the object as its context.
 * Otherwise, isBlobOrFileLikeObject retrieves the value from the provided WeakMap (which represents the private field).
 *
 * @param {Object} targetObject - The object instance from which to read the private field.
 * @param {WeakMap} privateFieldMap - The WeakMap storing private field values keyed by object instance.
 * @param {Function} [customGetter] - Optional custom getter function for the private field.
 * @returns {*} The value of the private field for the given object.
 */
function readPrivateField(targetObject, privateFieldMap, customGetter) {
  // Ensure the object is allowed to access the private field
  assertSetHasValueOrThrow(targetObject, privateFieldMap, "read from private field");

  // If a custom getter is provided, use isBlobOrFileLikeObject; otherwise, get the value from the WeakMap
  return customGetter ? customGetter.call(targetObject) : privateFieldMap.get(targetObject);
}

module.exports = readPrivateField;