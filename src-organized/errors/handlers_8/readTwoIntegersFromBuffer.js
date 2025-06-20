/**
 * Reads two 4-byte integers from the current buffer position and constructs a kL0 object with them.
 * Throws an error if there are not enough bytes left in the buffer.
 *
 * @throws {Error} If there are fewer than 8 bytes remaining in the buffer.
 * @returns {kL0} An instance of kL0 constructed from the two 4-byte integers read from the buffer.
 */
function readTwoIntegersFromBuffer() {
  // Check if there are at least 8 bytes left to read two 4-byte integers
  if (this.position + 8 > this.bufferLength) {
    // Throw an error using the external error handler fV
    throw fV(this, 8);
  }

  // Read the first 4-byte integer from the buffer
  this.position += 4;
  const firstInteger = readUInt32LEFromArray(this.buffer, this.position);

  // Read the second 4-byte integer from the buffer
  this.position += 4;
  const secondInteger = readUInt32LEFromArray(this.buffer, this.position);

  // Construct and return a new kL0 object with the two integers
  return new kL0(firstInteger, secondInteger);
}

module.exports = readTwoIntegersFromBuffer;