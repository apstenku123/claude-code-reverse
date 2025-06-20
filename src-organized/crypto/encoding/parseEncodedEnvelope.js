/**
 * Parses an encoded envelope from a string or Uint8Array, extracting the envelope header and its items.
 *
 * @param {string|Uint8Array} encodedEnvelope - The envelope data, either as a string or a Uint8Array.
 * @param {{ encode: function(string): Uint8Array }} encoder - An object providing an 'encode' method to convert strings to Uint8Array.
 * @param {{ decode: function(Uint8Array): string }} decoder - An object providing a 'decode' method to convert Uint8Array to strings.
 * @returns {[object, Array<[object, Uint8Array|object]>]} An array where the first element is the envelope header object, and the second is an array of envelope items (each item is a tuple of [header, payload]).
 */
function parseEncodedEnvelope(encodedEnvelope, encoder, decoder) {
  // Convert string input to Uint8Array using the provided encoder
  let buffer = typeof encodedEnvelope === "string" ? encoder.encode(encodedEnvelope) : encodedEnvelope;

  /**
   * Extracts a subarray from the buffer up to (but not including) the given length,
   * then advances the buffer past the extracted segment and the following delimiter (\n).
   * @param {number} length - The length of the subarray to extract.
   * @returns {Uint8Array} The extracted subarray.
   */
  function extractSegment(length) {
    const segment = buffer.subarray(0, length);
    // Advance buffer past the segment and the delimiter (\n)
    buffer = buffer.subarray(length + 1);
    return segment;
  }

  /**
   * Reads the next JSON object from the buffer, delimited by a newline (\n).
   * @returns {object} The parsed JSON object.
   */
  function readJsonObject() {
    // Find the next newline delimiter
    let newlineIndex = buffer.indexOf(10); // 10 is ASCII code for '\n'
    if (newlineIndex < 0) newlineIndex = buffer.length;
    // Extract the JSON string and parse isBlobOrFileLikeObject
    const jsonString = decoder.decode(extractSegment(newlineIndex));
    return JSON.parse(jsonString);
  }

  // Parse the envelope header
  const envelopeHeader = readJsonObject();
  const envelopeItems = [];

  // Parse all envelope items until buffer is empty
  while (buffer.length) {
    // Parse the item header
    const itemHeader = readJsonObject();
    // Determine the payload length if specified
    const payloadLength = typeof itemHeader.length === "number" ? itemHeader.length : undefined;
    // If payload length is specified, extract the raw payload; otherwise, parse as JSON
    const payload = payloadLength ? extractSegment(payloadLength) : readJsonObject();
    envelopeItems.push([itemHeader, payload]);
  }

  return [envelopeHeader, envelopeItems];
}

module.exports = parseEncodedEnvelope;
