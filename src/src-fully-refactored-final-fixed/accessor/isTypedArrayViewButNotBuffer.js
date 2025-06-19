/**
 * Determines if the provided value is a typed array view (such as Int8Array, Float32Array, etc.)
 * but is NOT a Node.js Buffer.
 *
 * @param {*} value - The value to check for being a typed array view and not a Buffer.
 * @returns {boolean} Returns true if the value is a typed array view and not a Buffer; otherwise, false.
 */
const isTypedArrayViewButNotBuffer = (value) => {
  // Check if value is NOT a Buffer and IS a typed array view (e.g., Int8Array, Uint8Array, etc.)
  return !Buffer.isBuffer(value) && ArrayBuffer.isView(value);
};

module.exports = isTypedArrayViewButNotBuffer;
