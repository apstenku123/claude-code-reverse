/**
 * Determines if the provided value is an ArrayBuffer view (such as a TypedArray or DataView),
 * or, if ArrayBuffer.isView is not available, checks if the value is an object with a buffer property
 * that passes the $WA check.
 *
 * @param {any} value - The value to check for ArrayBuffer view or buffer-like structure.
 * @returns {boolean} True if the value is an ArrayBuffer view or buffer-like object, false otherwise.
 */
function isArrayBufferViewOrBufferLike(value) {
  let isView;
  // Check if ArrayBuffer.isView is supported in the environment
  if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function") {
    // Use native ArrayBuffer.isView to check
    isView = ArrayBuffer.isView(value);
  } else {
    // Fallback: Check if value has a buffer property and validate with $WA
    isView = !!(value && value.buffer && $WA(value.buffer));
  }
  return isView;
}

module.exports = isArrayBufferViewOrBufferLike;