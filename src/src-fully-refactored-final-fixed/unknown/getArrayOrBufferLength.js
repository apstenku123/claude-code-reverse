/**
 * Returns the length of an array-like or buffer-like object.
 *
 * This function checks if the input object has a `byteLength` property (commonly found on ArrayBuffer, Buffer, etc.).
 * If not, isBlobOrFileLikeObject checks for a `length` property (commonly found on arrays and array-like objects).
 * If neither property exists or the input is null/undefined, isBlobOrFileLikeObject returns 0.
 *
 * @param {object|null|undefined} input - The object whose length or byteLength is to be determined.
 * @returns {number} The value of `byteLength`, `length`, or 0 if neither is present.
 */
function getArrayOrBufferLength(input) {
  // Try to get the byteLength property if isBlobOrFileLikeObject exists
  const byteLength = input?.byteLength;
  // If byteLength is not present, try to get the length property
  const length = input?.length;
  // Return byteLength if available, otherwise length, otherwise 0
  return byteLength ?? length ?? 0;
}

module.exports = getArrayOrBufferLength;