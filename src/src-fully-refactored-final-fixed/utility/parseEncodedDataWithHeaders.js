/**
 * Parses an encoded data buffer that contains a JSON header followed by a sequence of JSON metadata and associated binary payloads.
 *
 * @param {string|Uint8Array} encodedData - The data to parse, either as a string or Uint8Array.
 * @param {object} encoder - An object with an `encode` method for encoding strings to Uint8Array.
 * @param {object} decoder - An object with a `decode` method for decoding Uint8Array to strings.
 * @returns {[object, Array<[object, Uint8Array|object]>]} An array containing the parsed header object and an array of [metadata, payload] pairs.
 */
function parseEncodedDataWithHeaders(encodedData, encoder, decoder) {
  // Convert input to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
  let buffer = typeof encodedData === "string" ? encoder.encode(encodedData) : encodedData;

  /**
   * Extracts a subarray of the buffer up to the specified length, then advances the buffer.
   * @param {number} length - Number of bytes to extract.
   * @returns {Uint8Array} The extracted subarray.
   */
  function extractBytes(length) {
    const bytes = buffer.subarray(0, length);
    buffer = buffer.subarray(length + 1); // Skip delimiter (likely newline)
    return bytes;
  }

  /**
   * Parses the next JSON object from the buffer, up to the next newline (byte 10).
   * @returns {object} The parsed JSON object.
   */
  function parseNextJson() {
    let newlineIndex = buffer.indexOf(10); // 10 is ASCII for '\n'
    if (newlineIndex < 0) newlineIndex = buffer.length;
    const jsonString = decoder.decode(extractBytes(newlineIndex));
    return JSON.parse(jsonString);
  }

  // Parse the header (first JSON object)
  const header = parseNextJson();
  const entries = [];

  // Parse each entry: [metadata, payload]
  while (buffer.length) {
    const metadata = parseNextJson();
    // If metadata has a numeric 'length' property, treat as binary payload
    const payloadLength = typeof metadata.length === "number" ? metadata.length : undefined;
    const payload = payloadLength ? extractBytes(payloadLength) : parseNextJson();
    entries.push([metadata, payload]);
  }

  return [header, entries];
}

module.exports = parseEncodedDataWithHeaders;