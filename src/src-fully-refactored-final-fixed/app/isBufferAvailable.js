/**
 * Checks if the global Buffer object is available in the current environment.
 *
 * @returns {boolean} True if Buffer is defined, otherwise false.
 */
function isBufferAvailable() {
  // The Buffer object is typically available in Node.js environments
  return typeof Buffer !== "undefined";
}

module.exports = isBufferAvailable;