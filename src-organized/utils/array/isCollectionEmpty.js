/**
 * Checks if the provided collection-like value is empty.
 * Supports arrays, strings, Maps, Sets, array-like objects, and plain objects.
 *
 * @param {*} value - The value to check for emptiness.
 * @returns {boolean} - Returns true if the value is considered empty, false otherwise.
 */
function isCollectionEmpty(value) {
  // Null or undefined values are considered empty
  if (value == null) return true;

  // Check for array-like objects: arrays, strings, arguments, or objects with splice, etc.
  if (
    isArrayLike(value) &&
    (
      isArray(value) ||
      typeof value === "string" ||
      typeof value.splice === "function" ||
      isArguments(value) ||
      isBuffer(value) ||
      isTypedArray(value)
    )
  ) {
    return !value.length;
  }

  // Check for Map or Set (using their tag)
  const tag = getTag(value);
  if (tag === mapTag || tag === setTag) {
    return !value.size;
  }

  // Check for objects with a custom isEmpty implementation
  if (isPrototype(value)) {
    return !getOwnPropertyNames(value).length;
  }

  // Check for plain objects: if any own property exists, isBlobOrFileLikeObject'createInteractionAccessor not empty
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isCollectionEmpty;