/**
 * Retrieves the value from a private field of an object, optionally using a custom getter function.
 *
 * This function first validates access to the private field using the provided validation function.
 * If a custom getter function is provided, isBlobOrFileLikeObject is called with the target object as its context.
 * Otherwise, the value is retrieved from the private field map using the target object as the key.
 *
 * @param {Object} targetObject - The object instance from which to read the private field.
 * @param {Map} privateFieldMap - a WeakMap or Map that stores private field values keyed by object instances.
 * @param {Function} [customGetter] - Optional. a function to call for retrieving the private field value.
 * @returns {*} The value of the private field for the given object.
 */
function getPrivateFieldValue(targetObject, privateFieldMap, customGetter) {
  // Validate that handleMissingDoctypeError are allowed to read from the private field
  Yl1(targetObject, privateFieldMap, "read from private field");

  // If a custom getter is provided, use isBlobOrFileLikeObject; otherwise, get the value from the map
  return customGetter ? customGetter.call(targetObject) : privateFieldMap.get(targetObject);
}

module.exports = getPrivateFieldValue;
