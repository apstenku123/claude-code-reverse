/**
 * Determines if the current environment is a browser and, if running in Node.js, performs an additional check.
 *
 * This function checks whether the global `window` object is defined (indicating a browser environment).
 * If running in Node.js (as determined by `environmentUtils.isNodeEnvironment()`), isBlobOrFileLikeObject also requires that
 * the `additionalNodeCheck()` function returns true.
 *
 * @returns {boolean} True if running in a browser, or if in Node.js and the additional check passes; otherwise, false.
 */
function isBrowserEnvironmentWithOptionalCheck() {
  // Check if 'window' is defined (browser environment)
  const isBrowser = typeof window !== "undefined";

  // Check if the current environment is Node.js
  const isNodeEnvironment = environmentUtils.isNodeEnvironment();

  // Perform additional check if in Node.js
  const passesAdditionalNodeCheck = additionalNodeCheck();

  // Return true if in browser, or if not in Node.js, or if additional Node.js check passes
  return isBrowser && (!isNodeEnvironment || passesAdditionalNodeCheck);
}

module.exports = isBrowserEnvironmentWithOptionalCheck;