/**
 * Reads two consecutive 32-bit values from the buffer at the current position.
 * Throws an error if there are not enough bytes left in the buffer.
 *
 * @throws {Error} If there are fewer than 8 bytes remaining in the buffer.
 * @returns {kL0} An instance of kL0 initialized with the two 32-bit values read from the buffer.
 */
function readTwo32BitValues() {
  // Check if there are at least 8 bytes left in the buffer to read two 32-bit values
  if (this.position + 8 > this.length) {
    throw fV(this, 8); // External error handler for insufficient buffer length
  }

  // Read the first 32-bit value from the buffer
  this.position += 4;
  const firstValue = readUInt32LEFromArray(this.buffer, this.position);

  // Read the second 32-bit value from the buffer
  this.position += 4;
  const secondValue = readUInt32LEFromArray(this.buffer, this.position);

  // Return a new kL0 instance with the two values
  return new kL0(firstValue, secondValue);
}

module.exports = readTwo32BitValues;