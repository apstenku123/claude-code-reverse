/**
 * Checks if the current environment is either a Node.js server or Edge Runtime, and ensures that no document object is available.
 *
 * This function is typically used to determine if the code is running in a non-browser environment (such as Node.js or Edge Runtime)
 * and that the global document object is not present (i.e., not in a browser context).
 *
 * @returns {boolean} Returns true if running in Edge Runtime or Node.js and document is not available; otherwise, false.
 */
function isServerOrEdgeRuntime() {
  // Check if a document object is available (i.e., running in a browser)
  if (JCA._getDocumentSafe() !== null) {
    return false;
  }

  // Check if running in a Node.js environment
  const isNodeEnvironment =
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null;

  // Check if running in Edge Runtime (EdgeRuntime is defined as a string)
  const isEdgeRuntime = typeof EdgeRuntime === "string";

  // Return true if either Edge Runtime or Node.js environment is detected
  return isEdgeRuntime || isNodeEnvironment;
}

module.exports = isServerOrEdgeRuntime;
