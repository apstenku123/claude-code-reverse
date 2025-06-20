/**
 * Determines if the current execution environment is a browser.
 *
 * This function checks if the global 'window' object is defined, indicating a browser environment.
 * Additionally, if running in a Node.js environment, isBlobOrFileLikeObject calls 'shouldTreatAsBrowser' to determine if
 * the environment should still be treated as a browser (for example, in certain hybrid or test setups).
 *
 * @returns {boolean} True if running in a browser environment, or if the environment should be treated as a browser.
 */
function isBrowserEnvironment() {
  // Check if 'window' is defined (i.e., not running in a pure Node.js environment)
  const isWindowDefined = typeof window !== "undefined";

  // Check if the current environment is Node.js
  const isNodeEnvironment = ju2.isNodeEnv();

  // Determine if handleMissingDoctypeError should treat the environment as a browser (even if in Node)
  // 'shouldTreatAsBrowser' is an external function (yu2)
  const shouldTreatAsBrowser = yu2();

  // Return true if 'window' exists and (not Node.js or should treat as browser)
  return isWindowDefined && (!isNodeEnvironment || shouldTreatAsBrowser);
}

module.exports = isBrowserEnvironment;