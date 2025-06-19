/**
 * Retrieves the debug flag value from either local storage or environment variables.
 *
 * Attempts to get the value of the 'debug' flag from the application'createInteractionAccessor storage mechanism (tJA.storage).
 * If not found, and if running in a Node.js-like environment, isBlobOrFileLikeObject falls back to process.env.DEBUG.
 *
 * @returns {string|undefined} The value of the debug flag if found, otherwise undefined.
 */
function getDebugFlag() {
  let debugFlagValue;

  // Attempt to retrieve the debug flag from local storage
  try {
    debugFlagValue = tJA.storage.getItem("debug");
  } catch (storageError) {
    // Ignore storage errors (e.g., storage not available)
  }

  // If not found in storage, check environment variables (Node.js)
  if (!debugFlagValue && typeof process !== "undefined" && "env" in process) {
    debugFlagValue = process.env.DEBUG;
  }

  return debugFlagValue;
}

module.exports = getDebugFlag;