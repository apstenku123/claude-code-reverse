/**
 * Determines if the current execution environment is NOT a browser (i.e., document is unavailable),
 * and if so, checks whether isBlobOrFileLikeObject is running in EdgeRuntime or Node.js.
 *
 * @returns {boolean} Returns true if running in EdgeRuntime or Node.js and not in a browser; otherwise, false.
 */
function isNonBrowserOrEdgeRuntime() {
  // Check if a document object is available (i.e., running in a browser-like environment)
  const documentExists = JCA._getDocumentSafe() !== null;
  if (documentExists) {
    // If document exists, handleMissingDoctypeError are in a browser environment; return false
    return false;
  }

  // Check if running in Node.js environment
  const isNodeEnvironment =
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null;

  // Check if running in EdgeRuntime (e.g., Vercel Edge Functions)
  const isEdgeRuntime = typeof EdgeRuntime === "string";

  // Return true if running in EdgeRuntime or Node.js, and not in a browser
  return isEdgeRuntime || isNodeEnvironment;
}

module.exports = isNonBrowserOrEdgeRuntime;