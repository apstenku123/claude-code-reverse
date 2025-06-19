/**
 * Returns an array of enumerable property keys for the given object, including array-like objects and special cases (Buffer, TypedArray, etc).
 * Handles special objects by including their indexed keys and relevant properties, while filtering out internal or non-enumerable properties.
 *
 * @param {Object} targetObject - The object whose enumerable property keys are to be retrieved.
 * @param {boolean} [includeNonEnumerable=false] - If true, includes all properties (not just own enumerable properties).
 * @returns {Array<string>} Array of enumerable property keys.
 */
function getEnumerablePropertyKeys(targetObject, includeNonEnumerable = false) {
  // Check if the object is an array
  const isArray = J8(targetObject);
  // Check if the object is an arguments object
  const isArguments = !isArray && rE(targetObject);
  // Check if the object is a Buffer
  const isBuffer = !isArray && !isArguments && SH(targetObject);
  // Check if the object is a TypedArray (excluding Buffer)
  const isTypedArray = !isArray && !isArguments && !isBuffer && Ey(targetObject);

  // If the object is array-like or special, start with its indexed keys
  const isSpecialObject = isArray || isArguments || isBuffer || isTypedArray;
  const propertyKeys = isSpecialObject ? V2A(targetObject.length, String) : [];
  const indexedKeysLength = propertyKeys.length;

  // Iterate over all properties in the object
  for (const key in targetObject) {
    // Only include properties that are either:
    // - All properties if includeNonEnumerable is true
    // - Or own enumerable properties
    // Also, filter out special keys for special objects
    if (
      (includeNonEnumerable || Yy2.call(targetObject, key)) &&
      !(isSpecialObject && (
        key === "length" ||
        (isBuffer && (key === "offset" || key === "parent")) ||
        (isTypedArray && (key === "buffer" || key === "byteLength" || key === "byteOffset")) ||
        Nq(key, indexedKeysLength)
      ))
    ) {
      propertyKeys.push(key);
    }
  }

  return propertyKeys;
}

module.exports = getEnumerablePropertyKeys;