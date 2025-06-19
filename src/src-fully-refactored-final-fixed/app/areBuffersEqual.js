/**
 * Compares two Buffer objects for equality.
 *
 * This function checks if both inputs are Buffer instances and have the same length.
 * It then performs a constant-time comparison to determine if their contents are identical.
 *
 * @param {Buffer} bufferA - The first buffer to compare.
 * @param {Buffer} bufferB - The second buffer to compare.
 * @returns {boolean} True if both buffers are equal in content and length, false otherwise.
 */
function areBuffersEqual(bufferA, bufferB) {
  // Ensure both inputs are Buffer instances
  if (!Ie.isBuffer(bufferA) || !Ie.isBuffer(bufferB)) {
    return false;
  }

  // Buffers must be the same length
  if (bufferA.length !== bufferB.length) {
    return false;
  }

  // Use bitwise comparison to avoid timing attacks
  let difference = 0;
  for (let index = 0; index < bufferA.length; index++) {
    difference |= bufferA[index] ^ bufferB[index];
  }

  // If difference is zero, buffers are equal
  return difference === 0;
}

module.exports = areBuffersEqual;