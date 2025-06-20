/**
 * Retrieves two 32-bit values from the buffer at the current position and returns a new kL0 instance.
 * Throws an error if there are not enough bytes left in the buffer.
 *
 * @throws {Error} If there are fewer than 8 bytes remaining in the buffer.
 * @returns {kL0} An instance of kL0 constructed from two 32-bit values read from the buffer.
 */
function getPG1Accessor() {
  // Check if there are at least 8 bytes left to read two 32-bit values
  if (this.position + 8 > this.length) {
    throw fV(this, 8); // fV is assumed to throw an error for insufficient data
  }

  // Read the first 32-bit value and advance the position by 4 bytes
  const firstValue = readUInt32LEFromArray(this.buffer, this.position += 4);
  // Read the second 32-bit value and advance the position by another 4 bytes
  const secondValue = readUInt32LEFromArray(this.buffer, this.position += 4);

  // Return a new kL0 instance constructed from the two values
  return new kL0(firstValue, secondValue);
}

module.exports = getPG1Accessor;