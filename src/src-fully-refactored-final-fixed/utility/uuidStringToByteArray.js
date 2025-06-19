/**
 * Converts a UUID string into a 16-byte Uint8Array representation.
 *
 * @param {string} uuidString - The UUID string to convert (e.g., 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx').
 * @returns {Uint8Array} The 16-byte array representing the UUID.
 * @throws {TypeError} If the input is not a valid UUID string.
 */
function uuidStringToByteArray(uuidString) {
  // Validate the UUID string using external validator
  if (!rt6.default(uuidString)) {
    throw TypeError("Invalid UUID");
  }

  // Prepare a 16-byte array for the UUID
  const byteArray = new Uint8Array(16);
  let parsedSegment;

  // Parse first 8 hex digits (time_low)
  parsedSegment = parseInt(uuidString.slice(0, 8), 16);
  byteArray[0] = (parsedSegment >>> 24) & 0xFF;
  byteArray[1] = (parsedSegment >>> 16) & 0xFF;
  byteArray[2] = (parsedSegment >>> 8) & 0xFF;
  byteArray[3] = parsedSegment & 0xFF;

  // Parse next 4 hex digits (time_mid)
  parsedSegment = parseInt(uuidString.slice(9, 13), 16);
  byteArray[4] = (parsedSegment >>> 8) & 0xFF;
  byteArray[5] = parsedSegment & 0xFF;

  // Parse next 4 hex digits (time_high_and_version)
  parsedSegment = parseInt(uuidString.slice(14, 18), 16);
  byteArray[6] = (parsedSegment >>> 8) & 0xFF;
  byteArray[7] = parsedSegment & 0xFF;

  // Parse next 4 hex digits (clock_seq_and_reserved + clock_seq_low)
  parsedSegment = parseInt(uuidString.slice(19, 23), 16);
  byteArray[8] = (parsedSegment >>> 8) & 0xFF;
  byteArray[9] = parsedSegment & 0xFF;

  // Parse last 12 hex digits (node)
  parsedSegment = parseInt(uuidString.slice(24, 36), 16);
  // The node is 6 bytes, so handleMissingDoctypeError extract each byte
  byteArray[10] = (parsedSegment / 1099511627776) & 0xFF; // 2^40
  byteArray[11] = (parsedSegment / 4294967296) & 0xFF;    // 2^32
  byteArray[12] = (parsedSegment >>> 24) & 0xFF;
  byteArray[13] = (parsedSegment >>> 16) & 0xFF;
  byteArray[14] = (parsedSegment >>> 8) & 0xFF;
  byteArray[15] = parsedSegment & 0xFF;

  return byteArray;
}

module.exports = uuidStringToByteArray;