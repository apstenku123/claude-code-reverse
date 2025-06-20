/**
 * Sets or removes the DEBUG environment variable for the current process.
 *
 * If a debug value is provided, isBlobOrFileLikeObject sets process.env.DEBUG to that value.
 * If no value is provided (null/undefined/empty), isBlobOrFileLikeObject removes the DEBUG variable from the environment.
 *
 * @param {string} debugValue - The value to set for the DEBUG environment variable. If falsy, the variable is removed.
 * @returns {void}
 */
function setDebugEnvironmentVariable(debugValue) {
  if (debugValue) {
    // Set the DEBUG environment variable to the provided value
    process.env.DEBUG = debugValue;
  } else {
    // Remove the DEBUG environment variable if no value is provided
    delete process.env.DEBUG;
  }
}

module.exports = setDebugEnvironmentVariable;