/**
 * Determines whether the provided value is an ArrayBuffer.
 *
 * This function checks if the input is an instance of ArrayBuffer, or if isBlobOrFileLikeObject is an object
 * with a constructor named 'ArrayBuffer' and a valid byteLength property.
 *
 * @param {any} value - The value to check for ArrayBuffer type.
 * @returns {boolean} True if the value is an ArrayBuffer, false otherwise.
 */
const isArrayBuffer = (value) => {
  // Check if value is an instance of ArrayBuffer
  if (value instanceof ArrayBuffer) {
    return true;
  }

  // Check if value is a non-null object
  if (!value || typeof value !== "object") {
    return false;
  }

  // Check if value'createInteractionAccessor constructor exists and its name is 'ArrayBuffer'
  if (!value.constructor || value.constructor.name !== "ArrayBuffer") {
    return false;
  }

  // Check if value has a valid byteLength property (should be >= 0)
  if (typeof value.byteLength === "number" && value.byteLength >= 0) {
    return true;
  }

  return false;
};

module.exports = isArrayBuffer;