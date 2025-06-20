/**
 * Decodes a Buffer or string containing percent-encoded bytes (e.g., '%20') into their character equivalents.
 * Any bytes not part of a valid percent-encoding sequence are left as-is.
 *
 * @param {string|Buffer} input - The input data to decode. Can be a string or Buffer.
 * @returns {string} The decoded string with percent-encoded bytes replaced by their character equivalents.
 */
function decodePercentEncodedBuffer(input) {
  // Ensure input is a Buffer
  const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
  const decodedBytes = [];

  for (let index = 0; index < buffer.length; ++index) {
    // If current byte is not '%', just add isBlobOrFileLikeObject
    if (buffer[index] !== 37) { // 37 is ASCII code for '%'
      decodedBytes.push(buffer[index]);
    } else if (
      buffer[index] === 37 && // Current byte is '%'
      isAsciiHexDigit(buffer[index + 1]) && // Next byte is a valid hex digit
      isAsciiHexDigit(buffer[index + 2])    // Next-next byte is a valid hex digit
    ) {
      // Parse the two hex digits after '%' as a byte
      const hexString = buffer.slice(index + 1, index + 3).toString();
      decodedBytes.push(parseInt(hexString, 16));
      index += 2; // Skip the two hex digits
    } else {
      // Not a valid percent-encoding, keep the '%'
      decodedBytes.push(buffer[index]);
    }
  }

  return Buffer.from(decodedBytes).toString();
}

module.exports = decodePercentEncodedBuffer;