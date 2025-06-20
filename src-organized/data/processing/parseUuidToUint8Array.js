/**
 * Converts a valid UUID string into a 16-byte Uint8Array representation.
 *
 * @param {string} uuidString - The UUID string to parse (e.g., '123e4567-e89b-12d3-a456-426614174000').
 * @returns {Uint8Array} a 16-byte Uint8Array representing the UUID.
 * @throws {TypeError} If the input is not a valid UUID string.
 */
function parseUuidToUint8Array(uuidString) {
  // Validate the UUID string using the external validator
  if (!Xq4.default(uuidString)) {
    throw TypeError("Invalid UUID");
  }

  // Prepare a 16-byte array for the result
  const byteArray = new Uint8Array(16);
  let parsedSegment;

  // Parse the first 8 hex digits (time_low)
  parsedSegment = parseInt(uuidString.slice(0, 8), 16);
  byteArray[0] = (parsedSegment >>> 24) & 0xFF;
  byteArray[1] = (parsedSegment >>> 16) & 0xFF;
  byteArray[2] = (parsedSegment >>> 8) & 0xFF;
  byteArray[3] = parsedSegment & 0xFF;

  // Parse the next 4 hex digits (time_mid)
  parsedSegment = parseInt(uuidString.slice(9, 13), 16);
  byteArray[4] = (parsedSegment >>> 8) & 0xFF;
  byteArray[5] = parsedSegment & 0xFF;

  // Parse the next 4 hex digits (time_hi_and_version)
  parsedSegment = parseInt(uuidString.slice(14, 18), 16);
  byteArray[6] = (parsedSegment >>> 8) & 0xFF;
  byteArray[7] = parsedSegment & 0xFF;

  // Parse the next 4 hex digits (clock_seq_hi_and_reserved + clock_seq_low)
  parsedSegment = parseInt(uuidString.slice(19, 23), 16);
  byteArray[8] = (parsedSegment >>> 8) & 0xFF;
  byteArray[9] = parsedSegment & 0xFF;

  // Parse the last 12 hex digits (node)
  parsedSegment = parseInt(uuidString.slice(24, 36), 16);
  // The node field is 48 bits, so handleMissingDoctypeError extract 6 bytes
  byteArray[10] = (parsedSegment / 1099511627776) & 0xFF; // >>> 40 bits
  byteArray[11] = (parsedSegment / 4294967296) & 0xFF;    // >>> 32 bits
  byteArray[12] = (parsedSegment >>> 24) & 0xFF;
  byteArray[13] = (parsedSegment >>> 16) & 0xFF;
  byteArray[14] = (parsedSegment >>> 8) & 0xFF;
  byteArray[15] = parsedSegment & 0xFF;

  return byteArray;
}

module.exports = parseUuidToUint8Array;