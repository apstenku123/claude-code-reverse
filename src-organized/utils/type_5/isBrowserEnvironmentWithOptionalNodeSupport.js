/**
 * Determines if the current execution context is a browser environment,
 * and, if in a Node.js environment, optionally allows for additional conditions.
 *
 * This function checks if the global 'window' object is defined (indicating a browser),
 * and if not running in a Node.js environment, or if a custom Node.js check passes.
 *
 * @returns {boolean} True if running in a browser, or if in Node.js and the custom check passes; otherwise, false.
 */
function isBrowserEnvironmentWithOptionalNodeSupport() {
  // Check if 'window' is defined (i.e., running in a browser)
  const isBrowser = typeof window !== "undefined";

  // Check if running in a Node.js environment
  const isNodeEnvironment = ju2.isNodeEnv();

  // Custom check for Node.js environment
  const isNodeAllowed = yu2();

  // Return true if in browser, or if not in Node.js, or if Node.js custom check passes
  return isBrowser && (!isNodeEnvironment || isNodeAllowed);
}

module.exports = isBrowserEnvironmentWithOptionalNodeSupport;