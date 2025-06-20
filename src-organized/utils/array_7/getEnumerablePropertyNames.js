/**
 * Returns an array of enumerable property names for a given object, including array-like and typed array objects.
 * Handles special cases for arrays, arguments objects, buffers, and typed arrays to exclude certain properties.
 *
 * @param {Object} targetObject - The object whose enumerable property names are to be retrieved.
 * @param {boolean} [includeInherited=false] - If true, include inherited enumerable properties; otherwise, only own properties.
 * @returns {string[]} Array of enumerable property names.
 */
function getEnumerablePropertyNames(targetObject, includeInherited) {
  // Check if the object is an array
  const isArray = J8(targetObject);
  // Check if the object is an arguments object
  const isArguments = !isArray && rE(targetObject);
  // Check if the object is a typed array
  const isTypedArray = !isArray && !isArguments && SH(targetObject);
  // Check if the object is a buffer
  const isBuffer = !isArray && !isArguments && !isTypedArray && Ey(targetObject);

  // If the object is array-like (array, arguments, typed array, buffer)
  const isArrayLike = isArray || isArguments || isTypedArray || isBuffer;

  // Start with array indices as property names if array-like, else empty array
  const propertyNames = isArrayLike ? V2A(targetObject.length, String) : [];
  const propertyNamesLength = propertyNames.length;

  // Iterate over all enumerable properties
  for (const property in targetObject) {
    // Only include own properties unless includeInherited is true
    if ((includeInherited || Yy2.call(targetObject, property)) &&
      // Exclude certain properties for array-like objects
      !(isArrayLike && (
        property === "length" ||
        (isTypedArray && (property === "offset" || property === "parent")) ||
        (isBuffer && (property === "buffer" || property === "byteLength" || property === "byteOffset")) ||
        Nq(property, propertyNamesLength)
      ))
    ) {
      propertyNames.push(property);
    }
  }

  return propertyNames;
}

module.exports = getEnumerablePropertyNames;