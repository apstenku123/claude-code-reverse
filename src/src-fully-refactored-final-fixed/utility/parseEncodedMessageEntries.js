/**
 * Parses an encoded message buffer into a header and an array of message entries.
 *
 * The function takes an encoded buffer (or string), decodes and parses the header,
 * then iteratively parses each entry, extracting its metadata and payload.
 *
 * @param {Uint8Array|string} encodedBuffer - The buffer or string to parse. If a string, isBlobOrFileLikeObject will be encoded using the provided encoder.
 * @param {{ encode: function(string): Uint8Array }} encoder - An object with an encode method to convert strings to Uint8Array.
 * @param {{ decode: function(Uint8Array): string }} decoder - An object with a decode method to convert Uint8Array to string.
 * @returns {[any, Array<[any, Uint8Array|any]>]} An array where the first element is the parsed header object, and the second is an array of entries. Each entry is a tuple: [metadata, payload], where payload is either a Uint8Array or a parsed object.
 */
function parseEncodedMessageEntries(encodedBuffer, encoder, decoder) {
  // If input is a string, encode isBlobOrFileLikeObject to Uint8Array; otherwise, use as is
  let buffer = typeof encodedBuffer === "string" ? encoder.encode(encodedBuffer) : encodedBuffer;

  /**
   * Extracts a subarray of the buffer up to the specified length, then advances the buffer.
   * @param {number} length - The number of bytes to extract.
   * @returns {Uint8Array} The extracted subarray.
   */
  function extractBytes(length) {
    const bytes = buffer.subarray(0, length);
    buffer = buffer.subarray(length + 1); // Skip delimiter (likely newline)
    return bytes;
  }

  /**
   * Finds the next newline (byte 10), decodes and parses the JSON object up to that point.
   * Advances the buffer past the parsed segment.
   * @returns {any} The parsed JSON object.
   */
  function parseNextJsonObject() {
    let newlineIndex = buffer.indexOf(10); // 10 is newline '\n'
    if (newlineIndex < 0) newlineIndex = buffer.length;
    // Extract bytes up to newline, decode, and parse JSON
    return JSON.parse(decoder.decode(extractBytes(newlineIndex)));
  }

  // Parse the header object
  const header = parseNextJsonObject();
  const entries = [];

  // Parse each entry until the buffer is empty
  while (buffer.length) {
    const metadata = parseNextJsonObject();
    // If metadata has a numeric length, treat as binary payload; otherwise, parse as JSON
    const payloadLength = typeof metadata.length === "number" ? metadata.length : undefined;
    const payload = payloadLength ? extractBytes(payloadLength) : parseNextJsonObject();
    entries.push([metadata, payload]);
  }

  return [header, entries];
}

module.exports = parseEncodedMessageEntries;