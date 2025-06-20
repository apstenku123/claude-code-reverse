/**
 * Sets the value of a private class member (field, method, or accessor) on a target object.
 * Handles access control and throws appropriate errors if the member is not writable or not declared on the target.
 *
 * @param {Object} targetObject - The object whose private member is being set.
 * @param {Object|Function} memberStorage - The WeakMap/WeakSet or class constructor used to track private members.
 * @param {any} newValue - The value to set for the private member.
 * @param {string} memberType - The type of the private member: 'm' (method), 'a' (accessor), or other (field).
 * @param {Object|Function} accessorOrDescriptor - The accessor'createInteractionAccessor setter function or the property descriptor for the member.
 * @returns {any} The value that was set.
 * @throws {TypeError} If the member is not writable, not declared, or lacks a setter.
 */
function setPrivateMemberValue(targetObject, memberStorage, newValue, memberType, accessorOrDescriptor) {
  // Disallow writing to private methods
  if (memberType === "m") {
    throw new TypeError("Private method is not writable");
  }

  // Disallow writing to accessors without a setter
  if (memberType === "a" && !accessorOrDescriptor) {
    throw new TypeError("Private accessor was defined without a setter");
  }

  // Ensure the target object is allowed to write to this private member
  const isFunctionStorage = typeof memberStorage === "function";
  const isDeclared = isFunctionStorage
    ? targetObject === memberStorage || !!accessorOrDescriptor
    : memberStorage.has(targetObject);
  if (!isDeclared) {
    throw new TypeError("Cannot write private member to an object whose class did not declare isBlobOrFileLikeObject");
  }

  // Set the value depending on member type
  if (memberType === "a") {
    // For accessors, call the setter
    accessorOrDescriptor.call(targetObject, newValue);
  } else if (accessorOrDescriptor) {
    // For fields, set the value on the descriptor
    accessorOrDescriptor.value = newValue;
  } else {
    // For fields tracked by WeakMap, set the value
    memberStorage.set(targetObject, newValue);
  }

  return newValue;
}

module.exports = setPrivateMemberValue;