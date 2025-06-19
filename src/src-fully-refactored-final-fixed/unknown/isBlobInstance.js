/**
 * Checks if the provided value is an instance of the Blob class.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a Blob instance, false otherwise.
 */
const isBlobInstance = (value) => {
  // Ensure Blob is defined as a function (environment supports Blob)
  // and check if the value is an instance of Blob
  return typeof Blob === "function" && value instanceof Blob;
};

module.exports = isBlobInstance;
