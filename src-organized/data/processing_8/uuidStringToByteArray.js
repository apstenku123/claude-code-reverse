/**
 * Converts a UUID string into a 16-byte Uint8Array representation.
 *
 * @param {string} uuidString - The UUID string to convert (e.g., '123e4567-e89b-12d3-a456-426614174000').
 * @returns {Uint8Array} a 16-byte array representing the UUID.
 * @throws {TypeError} If the input is not a valid UUID string.
 */
function uuidStringToByteArray(uuidString) {
  // Validate the UUID string using the external validator
  if (!t74.default(uuidString)) {
    throw new TypeError("Invalid UUID");
  }

  // Prepare a 16-byte array for the UUID
  const byteArray = new Uint8Array(16);
  let parsedValue;

  // Parse and assign the first 4 bytes (8 hex chars)
  parsedValue = parseInt(uuidString.slice(0, 8), 16);
  byteArray[0] = (parsedValue >>> 24) & 0xff;
  byteArray[1] = (parsedValue >>> 16) & 0xff;
  byteArray[2] = (parsedValue >>> 8) & 0xff;
  byteArray[3] = parsedValue & 0xff;

  // Parse and assign bytes 4-5 (4 hex chars)
  parsedValue = parseInt(uuidString.slice(9, 13), 16);
  byteArray[4] = (parsedValue >>> 8) & 0xff;
  byteArray[5] = parsedValue & 0xff;

  // Parse and assign bytes 6-7 (4 hex chars)
  parsedValue = parseInt(uuidString.slice(14, 18), 16);
  byteArray[6] = (parsedValue >>> 8) & 0xff;
  byteArray[7] = parsedValue & 0xff;

  // Parse and assign bytes 8-9 (4 hex chars)
  parsedValue = parseInt(uuidString.slice(19, 23), 16);
  byteArray[8] = (parsedValue >>> 8) & 0xff;
  byteArray[9] = parsedValue & 0xff;

  // Parse and assign bytes 10-15 (12 hex chars)
  parsedValue = parseInt(uuidString.slice(24, 36), 16);
  // The 12 hex chars represent 6 bytes; extract each byte
  byteArray[10] = (parsedValue / 1099511627776) & 0xff; // >>> 40
  byteArray[11] = (parsedValue / 4294967296) & 0xff;    // >>> 32
  byteArray[12] = (parsedValue >>> 24) & 0xff;
  byteArray[13] = (parsedValue >>> 16) & 0xff;
  byteArray[14] = (parsedValue >>> 8) & 0xff;
  byteArray[15] = parsedValue & 0xff;

  return byteArray;
}

module.exports = uuidStringToByteArray;