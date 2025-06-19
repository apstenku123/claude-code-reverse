/**
 * Converts a valid UUID string into a 16-byte Uint8Array representation.
 *
 * @param {string} uuidString - The UUID string to convert (must be valid).
 * @returns {Uint8Array} a 16-byte array representing the UUID.
 * @throws {TypeError} If the input is not a valid UUID string.
 */
function uuidToUint8Array(uuidString) {
  // Validate the UUID string using the external validator
  if (!Xq4.default(uuidString)) {
    throw new TypeError("Invalid UUID");
  }

  // Create a 16-byte array to hold the UUID bytes
  const byteArray = new Uint8Array(16);
  let parsedValue;

  // Parse the first 8 hex digits (time_low)
  parsedValue = parseInt(uuidString.slice(0, 8), 16);
  byteArray[0] = (parsedValue >>> 24) & 0xff;
  byteArray[1] = (parsedValue >>> 16) & 0xff;
  byteArray[2] = (parsedValue >>> 8) & 0xff;
  byteArray[3] = parsedValue & 0xff;

  // Parse the next 4 hex digits (time_mid)
  parsedValue = parseInt(uuidString.slice(9, 13), 16);
  byteArray[4] = (parsedValue >>> 8) & 0xff;
  byteArray[5] = parsedValue & 0xff;

  // Parse the next 4 hex digits (time_hi_and_version)
  parsedValue = parseInt(uuidString.slice(14, 18), 16);
  byteArray[6] = (parsedValue >>> 8) & 0xff;
  byteArray[7] = parsedValue & 0xff;

  // Parse the next 4 hex digits (clock_seq_hi_and_reserved + clock_seq_low)
  parsedValue = parseInt(uuidString.slice(19, 23), 16);
  byteArray[8] = (parsedValue >>> 8) & 0xff;
  byteArray[9] = parsedValue & 0xff;

  // Parse the last 12 hex digits (node)
  parsedValue = parseInt(uuidString.slice(24, 36), 16);
  // The node field is 6 bytes (48 bits), but parseInt returns a Number (53 bits safe)
  // We extract each byte using division and bit masking
  byteArray[10] = (parsedValue / 1099511627776) & 0xff; // 2^40
  byteArray[11] = (parsedValue / 4294967296) & 0xff;    // 2^32
  byteArray[12] = (parsedValue >>> 24) & 0xff;
  byteArray[13] = (parsedValue >>> 16) & 0xff;
  byteArray[14] = (parsedValue >>> 8) & 0xff;
  byteArray[15] = parsedValue & 0xff;

  return byteArray;
}

module.exports = uuidToUint8Array;