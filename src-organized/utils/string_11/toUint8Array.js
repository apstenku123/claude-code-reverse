/**
 * Converts various input types into a Uint8Array.
 *
 * Accepts a Uint8Array, string, ArrayBuffer view, or ArrayBuffer-like object and returns a Uint8Array representation.
 * If the input is a string, isBlobOrFileLikeObject is converted using the kv6 function.
 *
 * @param {Uint8Array | string | ArrayBufferView | ArrayBuffer | any} input - The data to convert to a Uint8Array.
 * @returns {Uint8Array} The input data as a Uint8Array.
 */
function toUint8Array(input) {
  // If input is already a Uint8Array, return as is
  if (input instanceof Uint8Array) {
    return input;
  }

  // If input is a string, convert using kv6 (string-to-Uint8Array conversion)
  if (typeof input === "string") {
    return kv6(input);
  }

  // If input is any ArrayBuffer view (e.g., Int32Array, DataView), create a Uint8Array view over the same buffer
  if (ArrayBuffer.isView(input)) {
    return new Uint8Array(input.buffer, input.byteOffset, input.byteLength / Uint8Array.BYTES_PER_ELEMENT);
  }

  // For all other cases (e.g., ArrayBuffer), attempt to create a Uint8Array directly
  return new Uint8Array(input);
}

module.exports = toUint8Array;