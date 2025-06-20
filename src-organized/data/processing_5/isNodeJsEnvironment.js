/**
 * Determines if the current runtime environment is Node.js (not a browser bundle).
 *
 * This function checks two conditions:
 * 1. That the code is NOT running as a browser bundle (using Ru2.isBrowserBundle()).
 * 2. That the global 'process' object exists and is recognized as a Node.js process object.
 *
 * @returns {boolean} True if running in a Node.js environment, false otherwise.
 */
function isNodeJsEnvironment() {
  // Check if not running in a browser bundle
  const isNotBrowser = !Ru2.isBrowserBundle();

  // Check if 'process' exists and is the Node.js process object
  // typeof process !== 'undefined' ensures 'process' is defined
  // Object.prototype.toString.call(process) === '[object process]' confirms isBlobOrFileLikeObject'createInteractionAccessor the Node.js process object
  const isNodeProcess = Object.prototype.toString.call(
    typeof process !== 'undefined' ? process : 0
  ) === '[object process]';

  // Return true only if both conditions are met
  return isNotBrowser && isNodeProcess;
}

module.exports = isNodeJsEnvironment;