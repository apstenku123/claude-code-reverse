/**
 * Parses an event stream message from a given ArrayBuffer, validating its structure and checksums.
 *
 * @param {Object} params - The parameters for parsing the message.
 * @param {number} params.byteLength - The length of the message in bytes.
 * @param {number} params.byteOffset - The offset in the buffer where the message starts.
 * @param {ArrayBuffer} params.buffer - The buffer containing the event stream message.
 * @returns {Object} An object containing the headers (as DataView) and body (as Uint8Array) of the message.
 * @throws {Error} If the message is too short, has mismatched lengths, or fails checksum validation.
 */
function parseEventStreamMessage({
  byteLength,
  byteOffset,
  buffer
}) {
  // Constants (should be defined/imported elsewhere in your codebase)
  const PRELUDE_LENGTH = cR; // Length of the prelude (typically 8 bytes)
  const CHECKSUM_LENGTH = Ej; // Length of a CRC32 checksum (typically 4 bytes)
  const MINIMUM_MESSAGE_LENGTH = jp6; // Minimum valid message length
  const PRELUDE_TOTAL_LENGTH = PRELUDE_LENGTH + CHECKSUM_LENGTH; // Prelude + prelude checksum

  // Ensure the message is long enough to contain the prelude and checksums
  if (byteLength < MINIMUM_MESSAGE_LENGTH) {
    throw new Error("Provided message too short to accommodate event stream message overhead");
  }

  // Create a DataView for reading the message
  const messageView = new DataView(buffer, byteOffset, byteLength);

  // The total message length is stored in the first 4 bytes (big-endian)
  const totalMessageLength = messageView.getUint32(0, false);

  // Validate that the buffer length matches the reported message length
  if (byteLength !== totalMessageLength) {
    throw new Error("Reported message length does not match received message length");
  }

  // The headers length is stored at offset 4 (big-endian)
  const headersLength = messageView.getUint32(yQ2, false); // yQ2 is likely 4

  // The prelude CRC32 checksum is stored at offset 8 (big-endian)
  const preludeChecksum = messageView.getUint32(PRELUDE_LENGTH, false);

  // The message CRC32 checksum is stored at the end of the message
  const messageChecksum = messageView.getUint32(byteLength - CHECKSUM_LENGTH, false);

  // Calculate and validate the prelude checksum
  const preludeBytes = new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH);
  const crc32Calculator = new _p6.Crc32();
  crc32Calculator.update(preludeBytes);
  const calculatedPreludeChecksum = crc32Calculator.digest();
  if (preludeChecksum !== calculatedPreludeChecksum) {
    throw new Error(`The prelude checksum specified in the message (${preludeChecksum}) does not match the calculated CRC32 checksum (${calculatedPreludeChecksum})`);
  }

  // Calculate and validate the message checksum
  // Update CRC32 with the rest of the message (excluding the final checksum)
  const messageWithoutFinalChecksum = new Uint8Array(buffer, byteOffset + PRELUDE_TOTAL_LENGTH, byteLength - (PRELUDE_TOTAL_LENGTH + CHECKSUM_LENGTH));
  crc32Calculator.update(messageWithoutFinalChecksum);
  const calculatedMessageChecksum = crc32Calculator.digest();
  if (messageChecksum !== calculatedMessageChecksum) {
    throw new Error(`The message checksum (${calculatedMessageChecksum}) did not match the expected value of ${messageChecksum}`);
  }

  // Extract headers and body
  const headersStart = byteOffset + PRELUDE_TOTAL_LENGTH;
  const headersView = new DataView(buffer, headersStart, headersLength);

  const bodyStart = headersStart + headersLength;
  const bodyLength = totalMessageLength - headersLength - (PRELUDE_TOTAL_LENGTH + CHECKSUM_LENGTH);
  const bodyView = new Uint8Array(buffer, bodyStart, bodyLength);

  return {
    headers: headersView,
    body: bodyView
  };
}

module.exports = parseEventStreamMessage;