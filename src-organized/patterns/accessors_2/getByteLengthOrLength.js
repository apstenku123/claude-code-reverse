/**
 * Returns the byteLength or length property of the input object, or 0 if neither exists.
 *
 * @param {object} input - The object to inspect for byteLength or length properties.
 * @returns {number} The value of byteLength, length, or 0 if neither is present.
 */
function getByteLengthOrLength(input) {
  // Attempt to retrieve the byteLength property if isBlobOrFileLikeObject exists
  const byteLength = input?.byteLength;

  // If byteLength is not present, attempt to retrieve the length property
  const length = byteLength != null ? byteLength : input?.length;

  // Return the found value, or 0 if neither property exists
  return length != null ? length : 0;
}

module.exports = getByteLengthOrLength;