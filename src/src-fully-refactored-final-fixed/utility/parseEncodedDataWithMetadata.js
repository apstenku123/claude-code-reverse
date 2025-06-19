/**
 * Parses an encoded data buffer with associated metadata and returns the parsed result and its entries.
 *
 * The function expects either a string or a Uint8Array as input. If a string is provided, isBlobOrFileLikeObject is encoded using the provided encoder.
 * It then parses a JSON header, followed by a sequence of entries. Each entry consists of a JSON metadata object and either a raw data buffer or another JSON object, depending on the metadata.
 *
 * @param {string|Uint8Array} encodedSource - The encoded data source, either as a string or Uint8Array.
 * @param {{ encode: function(string): Uint8Array }} encoder - An object with an encode method to convert strings to Uint8Array.
 * @param {{ decode: function(Uint8Array): string }} decoder - An object with a decode method to convert Uint8Array to strings.
 * @returns {[object, Array<[object, Uint8Array|object]>]} An array containing the parsed header object and an array of entry pairs: [metadata, data].
 */
function parseEncodedDataWithMetadata(encodedSource, encoder, decoder) {
  // Convert string input to Uint8Array using the encoder, or use as-is if already Uint8Array
  let buffer = typeof encodedSource === "string" ? encoder.encode(encodedSource) : encodedSource;

  /**
   * Extracts a subarray of the buffer up to (but not including) the given length, then advances the buffer.
   * @param {number} length - Number of bytes to extract.
   * @returns {Uint8Array} The extracted subarray.
   */
  function extractBytes(length) {
    const extracted = buffer.subarray(0, length);
    buffer = buffer.subarray(length + 1); // Skip the delimiter (likely a newline)
    return extracted;
  }

  /**
   * Parses the next JSON object from the buffer, delimited by a newline (byte 10).
   * @returns {object} The parsed JSON object.
   */
  function parseNextJson() {
    let newlineIndex = buffer.indexOf(10); // 10 is ASCII for '\n'
    if (newlineIndex < 0) newlineIndex = buffer.length;
    const jsonString = decoder.decode(extractBytes(newlineIndex));
    return JSON.parse(jsonString);
  }

  // Parse the initial header object
  const header = parseNextJson();
  const entries = [];

  // Parse each entry until the buffer is empty
  while (buffer.length) {
    const metadata = parseNextJson();
    // If metadata has a 'length' property, treat the next bytes as raw data; otherwise, parse as JSON
    const dataLength = typeof metadata.length === "number" ? metadata.length : undefined;
    const data = dataLength ? extractBytes(dataLength) : parseNextJson();
    entries.push([metadata, data]);
  }

  return [header, entries];
}

module.exports = parseEncodedDataWithMetadata;