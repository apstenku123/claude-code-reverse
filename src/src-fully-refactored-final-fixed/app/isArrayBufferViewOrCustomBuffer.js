/**
 * Determines whether the provided value is an ArrayBuffer view or a custom buffer type.
 *
 * This function first checks if the environment supports ArrayBuffer and its isView method. If so,
 * isBlobOrFileLikeObject uses ArrayBuffer.isView to determine if the input is a view on an ArrayBuffer (such as a TypedArray or DataView).
 * If not, isBlobOrFileLikeObject checks if the input has a 'buffer' property and passes that to the custom $WA function for further validation.
 *
 * @param {any} value - The value to check for being an ArrayBuffer view or custom buffer.
 * @returns {boolean} True if the value is an ArrayBuffer view or passes the custom buffer check; otherwise, false.
 */
function isArrayBufferViewOrCustomBuffer(value) {
  let isBufferView;

  // Check if ArrayBuffer.isView is available in the environment
  if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function") {
    // Use native ArrayBuffer.isView to check if value is a view on an ArrayBuffer
    isBufferView = ArrayBuffer.isView(value);
  } else {
    // Fallback: Check if value has a 'buffer' property and validate with custom $WA function
    isBufferView = Boolean(value && value.buffer && $WA(value.buffer));
  }

  return isBufferView;
}

module.exports = isArrayBufferViewOrCustomBuffer;