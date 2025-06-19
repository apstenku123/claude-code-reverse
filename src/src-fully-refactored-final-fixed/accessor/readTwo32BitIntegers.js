/**
 * Reads two consecutive 32-bit integers from the buffer at the current position.
 * Throws an error if there are not enough bytes left in the buffer.
 *
 * @throws {Error} If there are fewer than 8 bytes remaining in the buffer.
 * @returns {kL0} An instance of kL0 constructed from the two 32-bit integers read.
 */
function readTwo32BitIntegers() {
  // Ensure there are at least 8 bytes left to read two 32-bit integers
  if (this.position + 8 > this.length) {
    throw fV(this, 8); // fV likely throws an error for insufficient bytes
  }

  // Read the first 32-bit integer and advance the position by 4 bytes
  const firstInteger = readUInt32LEFromArray(this.buffer, this.position += 4);
  // Read the second 32-bit integer and advance the position by another 4 bytes
  const secondInteger = readUInt32LEFromArray(this.buffer, this.position += 4);

  // Return a new kL0 instance constructed from the two integers
  return new kL0(firstInteger, secondInteger);
}

module.exports = readTwo32BitIntegers;