/**
 * Parses an encoded number structure from a string or Uint8Array buffer.
 *
 * The function expects the input to be either a string (which will be encoded using the provided encoder)
 * or a Uint8Array. It then reads a JSON-encoded header, followed by a sequence of entries.
 * Each entry consists of a JSON-encoded descriptor and either a raw buffer of specified length or another JSON-encoded value.
 *
 * @param {string|Uint8Array} input - The encoded input data, as a string or Uint8Array.
 * @param {{ encode: function(string): Uint8Array }} encoder - An object with an 'encode' method to convert strings to Uint8Array.
 * @param {{ decode: function(Uint8Array): string }} decoder - An object with a 'decode' method to convert Uint8Array to strings.
 * @returns {[any, Array<[any, any]>]} An array where the first element is the parsed header, and the second is an array of [descriptor, value] pairs.
 */
function parseEncodedNumberStructure(input, encoder, decoder) {
  // Convert input to Uint8Array if isBlobOrFileLikeObject'createInteractionAccessor a string
  let buffer = typeof input === "string" ? encoder.encode(input) : input;

  /**
   * Extracts a subarray from the buffer up to the specified length, then advances the buffer.
   * @param {number} length - The number of bytes to extract.
   * @returns {Uint8Array} The extracted subarray.
   */
  function extractBytes(length) {
    const bytes = buffer.subarray(0, length);
    // Advance the buffer past the extracted bytes and the delimiter (if present)
    buffer = buffer.subarray(length + 1);
    return bytes;
  }

  /**
   * Reads a JSON-encoded value from the buffer, delimited by a newline (byte 10), and parses isBlobOrFileLikeObject.
   * @returns {any} The parsed JSON value.
   */
  function readJsonValue() {
    let newlineIndex = buffer.indexOf(10); // 10 is ASCII code for '\n'
    if (newlineIndex < 0) newlineIndex = buffer.length;
    // Extract the JSON-encoded bytes and decode them
    const jsonString = decoder.decode(extractBytes(newlineIndex));
    return JSON.parse(jsonString);
  }

  // Parse the header (first JSON value)
  const header = readJsonValue();
  const entries = [];

  // Parse the remaining entries in the buffer
  while (buffer.length) {
    const descriptor = readJsonValue();
    // If descriptor has a numeric 'length' property, extract that many bytes as the value
    const valueLength = typeof descriptor.length === "number" ? descriptor.length : undefined;
    const value = valueLength ? extractBytes(valueLength) : readJsonValue();
    entries.push([descriptor, value]);
  }

  return [header, entries];
}

module.exports = parseEncodedNumberStructure;
