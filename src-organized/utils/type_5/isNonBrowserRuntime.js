/**
 * Determines if the current JavaScript runtime environment is not a browser.
 *
 * This function checks if the global document object is unavailable (i.e., not running in a browser),
 * and then detects if the environment is Node.js or Edge Runtime.
 *
 * @returns {boolean} Returns true if running in Node.js or Edge Runtime, false if running in a browser.
 */
const isNonBrowserRuntime = () => {
  // Check if a document object is available (i.e., running in a browser)
  const isDocumentAvailable = JCA._getDocumentSafe() !== null;
  if (isDocumentAvailable) {
    // If document exists, handleMissingDoctypeError are in a browser environment
    return false;
  }

  // Check if running in Node.js by verifying process.versions.node exists
  const isNodeJs =
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null;

  // Check if running in Edge Runtime (e.g., Vercel Edge Functions)
  const isEdgeRuntime = typeof EdgeRuntime === "string";

  // Return true if either Node.js or Edge Runtime is detected
  return isEdgeRuntime || isNodeJs;
};

module.exports = isNonBrowserRuntime;
