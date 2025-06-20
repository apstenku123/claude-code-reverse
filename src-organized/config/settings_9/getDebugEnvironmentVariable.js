/**
 * Retrieves the value of the DEBUG environment variable from the current process.
 *
 * @returns {string | undefined} The value of the DEBUG environment variable, or undefined if not set.
 */
function getDebugEnvironmentVariable() {
  // Access the DEBUG environment variable from process.env
  return process.env.DEBUG;
}

module.exports = getDebugEnvironmentVariable;