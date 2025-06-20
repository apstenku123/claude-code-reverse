/**
 * Checks if the global 'window' object is defined and truthy.
 *
 * This function is useful for determining if the current JavaScript environment
 * is a browser (where 'window' is available) or a non-browser environment (like Node.js).
 *
 * @returns {boolean} Returns true if 'window' is defined and truthy, otherwise false.
 */
function isWindowDefined() {
  // 'typeof window !== "undefined"' ensures 'window' exists in the environment
  // '!!window' ensures that the 'window' object is truthy
  return typeof window !== "undefined" && !!window;
}

module.exports = isWindowDefined;