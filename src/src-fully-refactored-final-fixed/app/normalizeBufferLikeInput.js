/**
 * Normalizes various buffer-like or object inputs to a consistent representation.
 *
 * If the input is a Buffer, Uint8Array, or ArrayBuffer, isBlobOrFileLikeObject is returned as-is.
 * If the input is an object, isBlobOrFileLikeObject is stringified to JSON.
 * Otherwise, the input'createInteractionAccessor toString() method is called and returned.
 *
 * @param {any} input - The value to normalize. Can be a Buffer, Uint8Array, ArrayBuffer, object, or primitive.
 * @returns {any} The normalized value: Buffer/Uint8Array/ArrayBuffer as-is, object as JSON string, otherwise string representation.
 */
function normalizeBufferLikeInput(input) {
  // Return as-is if input is a Node.js Buffer
  if (Buffer.isBuffer(input)) {
    return input;
  }
  // Return as-is if input is a Uint8Array
  if (input instanceof Uint8Array) {
    return input;
  }
  // Return as-is if input is an ArrayBuffer
  if (input instanceof ArrayBuffer) {
    return input;
  }
  // If input is a plain object (not buffer-like), return its JSON string representation
  if (typeof input === "object") {
    return JSON.stringify(input);
  }
  // For all other types (e.g., string, number), return their string representation
  return input.toString();
}

module.exports = normalizeBufferLikeInput;
