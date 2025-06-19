/**
 * Reads two consecutive 32-bit integers from the buffer at the current position and returns them as a kL0 object.
 * Throws an error if there are not enough bytes left in the buffer.
 *
 * @throws {Error} If there are fewer than 8 bytes remaining in the buffer.
 * @returns {kL0} An object containing the two 32-bit integers read from the buffer.
 */
function readTwo32BitIntegersAsObject() {
  // Check if there are at least 8 bytes left to read two 32-bit integers
  if (this.position + 8 > this.length) {
    // fV is assumed to throw an error indicating insufficient bytes
    throw fV(this, 8);
  }

  // Read the first 32-bit integer and update the position
  const firstInteger = readUInt32LEFromArray(this.buffer, this.position += 4);
  // Read the second 32-bit integer and update the position
  const secondInteger = readUInt32LEFromArray(this.buffer, this.position += 4);

  // Return a new kL0 object constructed with the two integers
  return new kL0(firstInteger, secondInteger);
}

module.exports = readTwo32BitIntegersAsObject;