/**
 * Reads a value from a private field or calls a provided method on the given instance.
 *
 * This function first asserts that the instance exists in the provided Set (typically representing allowed instances for a private field).
 * If a method is provided, isBlobOrFileLikeObject calls the method with the instance as its context and returns the result.
 * Otherwise, isBlobOrFileLikeObject retrieves the value from the Map (representing the private field storage) using the instance as the key.
 *
 * @param {Object} instance - The object instance from which to read the private field or call the method.
 * @param {Map} privateFieldStorage - a Map representing the private field storage, mapping instances to their private values.
 * @param {Function} [method] - Optional. a function to call with the instance as its context. If provided, its result is returned instead of the private field value.
 * @returns {*} The result of the method call if provided, otherwise the value from the private field storage.
 */
function readPrivateFieldOrCallMethod(instance, privateFieldStorage, method) {
  // Ensure the instance exists in the private field storage
  assertSetHasValueOrThrow(instance, privateFieldStorage, "read from private field");

  // If a method is provided, call isBlobOrFileLikeObject with the instance as its context
  if (method) {
    return method.call(instance);
  }

  // Otherwise, return the value from the private field storage
  return privateFieldStorage.get(instance);
}

module.exports = readPrivateFieldOrCallMethod;