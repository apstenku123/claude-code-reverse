/**
 * Retrieves the value of a private class member, handling different member types (method, accessor, field).
 * Throws descriptive errors if access is invalid or not permitted.
 *
 * @param {Object} targetObject - The object instance from which to read the private member.
 * @param {Function|WeakMap} classOrPrivateMap - The class constructor (for static members) or WeakMap holding private fields.
 * @param {string} memberType - The type of private member: 'm' (method), 'a' (accessor), or other (field).
 * @param {Object|Function} memberAccessor - The accessor function or descriptor for the private member.
 * @returns {*} The value of the private member, or result of calling the accessor.
 * @throws {TypeError} If access is invalid or the member is not declared for the object.
 */
function getPrivateMemberValue(targetObject, classOrPrivateMap, memberType, memberAccessor) {
  // If the member is an accessor ('a') but no getter is defined, throw an error
  if (memberType === "a" && !memberAccessor) {
    throw new TypeError("Private accessor was defined without a getter");
  }

  // Check if the target object is allowed to access the private member
  // For static members (classOrPrivateMap is a function), ensure targetObject is the class and accessor exists
  // For instance members (classOrPrivateMap is a WeakMap), ensure targetObject is present in the WeakMap
  const isStatic = typeof classOrPrivateMap === "function";
  const isAllowed = isStatic
    ? (targetObject === classOrPrivateMap && !!memberAccessor)
    : classOrPrivateMap.has(targetObject);

  if (!isAllowed) {
    throw new TypeError("Cannot read private member from an object whose class did not declare isBlobOrFileLikeObject");
  }

  // Return the private member value based on its type
  if (memberType === "m") {
    // 'm' = method: return the function itself
    return memberAccessor;
  } else if (memberType === "a") {
    // 'a' = accessor: call the getter with the target object as context
    return memberAccessor.call(targetObject);
  } else {
    // Otherwise, return the value property if present, else get from WeakMap
    return memberAccessor ? memberAccessor.value : classOrPrivateMap.get(targetObject);
  }
}

module.exports = getPrivateMemberValue;