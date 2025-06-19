/**
 * Checks if the current JavaScript environment is a browser.
 *
 * This function determines whether the code is running in a browser by verifying
 * the existence of the global `window` object, the `window.document` property,
 * and the `navigator` object. These are typically present in browser environments
 * and absent in server-side (e.g., Node.js) or non-browser contexts.
 *
 * @returns {boolean} Returns true if running in a browser environment; otherwise, false.
 */
const isBrowserEnvironment = () => {
  // Check for the existence of 'window', 'window.document', and 'navigator' objects
  return (
    typeof window !== "undefined" &&
    typeof window.document !== "undefined" &&
    typeof navigator !== "undefined"
  );
};

module.exports = isBrowserEnvironment;
